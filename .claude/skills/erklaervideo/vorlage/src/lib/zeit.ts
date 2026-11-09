// Zeitsteuerung: alle Zeitpunkte stammen aus public/timing.json (erzeugt von tts.py).
// So erscheinen Bild, Text und Effekte genau dann, wenn sie gesprochen werden.
import timingRaw from '../../public/timing.json';

export type Cue = {start: number; end: number; text: string; szene: string};
export type Szene = {start: number; end: number};
export type Timing = {
  fps: number;
  breite: number;
  hoehe: number;
  gesamtFrames: number;
  cues: Record<string, Cue>;
  szenen: Record<string, Szene>;
  reihenfolge: string[];
};

export const timing = timingRaw as unknown as Timing;
export const FPS = timing.fps;

/** Startframe eines Satzes (absolut). Optional verschoben um `versatzSek`. */
export const cueStart = (id: string, versatzSek = 0): number => {
  const c = timing.cues[id];
  if (!c) throw new Error(`Cue "${id}" fehlt in timing.json`);
  return Math.round(c.start + versatzSek * FPS);
};

export const cueEnde = (id: string): number => {
  const c = timing.cues[id];
  if (!c) throw new Error(`Cue "${id}" fehlt in timing.json`);
  return c.end;
};

/**
 * Startframe eines Satzes RELATIV zum Szenenbeginn – für den Einsatz innerhalb einer Szene,
 * denn useCurrentFrame() zählt in einer <Sequence> ab 0.
 */
export const imSzene = (szene: string, cueId: string, versatzSek = 0): number => {
  const s = timing.szenen[szene];
  if (!s) throw new Error(`Szene "${szene}" fehlt in timing.json`);
  return cueStart(cueId, versatzSek) - s.start;
};

/** Startframe eines bestimmten Wortes innerhalb eines Satzes (geschätzt nach Silbenanteil). */
export const wortStart = (id: string, wortIndex: number): number => {
  const c = timing.cues[id];
  const woerter = c.text.split(/\s+/);
  const gewicht = (w: string) => Math.max(1, (w.match(/[aeiouäöüy]+/gi) || []).length);
  const summe = woerter.reduce((a, w) => a + gewicht(w), 0);
  const vorher = woerter.slice(0, wortIndex).reduce((a, w) => a + gewicht(w), 0);
  return Math.round(c.start + ((c.end - c.start) * vorher) / summe);
};

export const sek = (s: number) => Math.round(s * FPS);
