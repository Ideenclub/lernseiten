#!/usr/bin/env python3
"""QR-Code als PNG: Fehlerkorrektur M, schwarz auf weiß, mind. 600 px.
Aufruf: qr.py <URL> <ziel.png>"""
import sys
import qrcode
from qrcode.constants import ERROR_CORRECT_M

url, ziel = sys.argv[1], sys.argv[2]
q = qrcode.QRCode(error_correction=ERROR_CORRECT_M, box_size=10, border=4)
q.add_data(url)
q.make(fit=True)
img = q.make_image(fill_color="black", back_color="white").convert("RGB")
if img.size[0] < 600:
    f = -(-600 // img.size[0])
    img = img.resize((img.size[0] * f, img.size[1] * f), 0)
img.save(ziel)
print(ziel, img.size)
