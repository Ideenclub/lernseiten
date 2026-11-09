#!/usr/bin/env python3
"""Wikimedia Commons: suchen und Bilder MIT Lizenzangaben herunterladen.

  commons.py suche "Watt steam engine"            -> Treffer mit Lizenz, Größe, Urheber
  commons.py laden "File:Name.jpg" ziel.jpg [breite] -> lädt (Standard 2400 px Breite), gibt Nachweis-JSON aus

Nur Lizenzen: Public Domain, CC0, CC BY, CC BY-SA (BY-SA nur nach Rücksprache, siehe SKILL.md).
"""
import json
import re
import sys
import time
import urllib.parse
import urllib.request

UA = "LernseitenErklaervideo/1.0 (https://ideenclub.github.io/lernseiten/; Schulprojekt)"
API = "https://commons.wikimedia.org/w/api.php"


def get(url, versuche=5):
    for i in range(versuche):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            if e.code == 429 and i < versuche - 1:
                time.sleep(10 * 2 ** i)
                continue
            host = urllib.parse.urlparse(url).netloc
            sys.exit(f"Download gescheitert ({e.code}) – Adresse: {host}")
        except urllib.error.URLError as e:
            host = urllib.parse.urlparse(url).netloc
            sys.exit(f"Keine Verbindung – ggf. diese Adresse freigeben: {host} ({e.reason})")


def info(titel, breite=2400):
    q = {"action": "query", "titles": titel, "prop": "imageinfo", "iiprop": "url|size|extmetadata|mime",
         "iiurlwidth": str(breite), "format": "json"}
    d = json.loads(get(API + "?" + urllib.parse.urlencode(q)))
    seite = next(iter(d["query"]["pages"].values()))
    ii = seite["imageinfo"][0]
    md = ii.get("extmetadata", {})
    clean = lambda k: re.sub("<[^>]+>", "", md.get(k, {}).get("value", "")).strip()
    return {
        "titel": titel,
        "seite": ii.get("descriptionurl"),
        "url": ii.get("thumburl") or ii["url"],
        "original_breite": ii["width"], "original_hoehe": ii["height"],
        "lizenz": clean("LicenseShortName"), "lizenz_url": clean("LicenseUrl"),
        "urheber": clean("Artist"), "beschreibung": clean("ImageDescription")[:300],
        "nachweis_pflicht": clean("AttributionRequired"),
    }


def suche(begriff, n=12):
    q = {"action": "query", "generator": "search", "gsrsearch": f"filetype:bitmap {begriff}", "gsrnamespace": "6",
         "gsrlimit": str(n), "prop": "imageinfo", "iiprop": "size|extmetadata", "format": "json"}
    d = json.loads(get(API + "?" + urllib.parse.urlencode(q)))
    for p in d.get("query", {}).get("pages", {}).values():
        ii = p["imageinfo"][0]
        md = ii.get("extmetadata", {})
        liz = md.get("LicenseShortName", {}).get("value", "?")
        print(f"{ii['width']:>5}x{ii['height']:<5} {liz:<18} {p['title']}")


if __name__ == "__main__":
    if sys.argv[1] == "suche":
        suche(sys.argv[2])
    elif sys.argv[1] == "laden":
        i = info(sys.argv[2], int(sys.argv[4]) if len(sys.argv) > 4 else 2400)
        open(sys.argv[3], "wb").write(get(i["url"]))
        print(json.dumps(i, ensure_ascii=False, indent=1))
