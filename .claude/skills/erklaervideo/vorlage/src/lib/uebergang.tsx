// Übergänge zwischen Szenen. In jedem Video eine andere Art wählen (siehe SKILL.md).
import React from 'react';
import {AbsoluteFill, Easing, interpolate} from 'remotion';

export type UebergangsArt =
  | 'blende' // weiche Überblendung
  | 'wischen' // Schnitt wandert von links nach rechts
  | 'diagonal' // diagonale Kante
  | 'kreis' // Iris öffnet sich aus der Mitte (oder aus `ursprung`)
  | 'schieben' // neue Szene schiebt die alte aus dem Bild
  | 'zoom' // neue Szene zoomt heran, alte tritt zurück
  | 'streifen' // mehrere vertikale Streifen öffnen sich versetzt
  | 'schnitt'; // harter Schnitt

export type UebergangsConfig = {art: UebergangsArt; dauerSek: number; ursprung?: [number, number]};

const ease = Easing.bezier(0.65, 0, 0.35, 1);

/** p = 0 … 1 Fortschritt des Eintritts dieser Szene; q = 0 … 1 Fortschritt ihres Austritts. */
export const UebergangsHuelle: React.FC<{
  cfg: UebergangsConfig;
  p: number;
  q: number;
  children: React.ReactNode;
}> = ({cfg, p, q, children}) => {
  const e = ease(Math.min(1, Math.max(0, p)));
  const x = ease(Math.min(1, Math.max(0, q)));
  let style: React.CSSProperties = {};
  const [ox, oy] = cfg.ursprung ?? [50, 50];
  switch (cfg.art) {
    case 'blende':
      style = {opacity: e};
      break;
    case 'wischen':
      style = {clipPath: `inset(0 ${100 - e * 100}% 0 0)`};
      break;
    case 'diagonal': {
      const v = interpolate(e, [0, 1], [-40, 140]);
      style = {clipPath: `polygon(0 0, ${v}% 0, ${v - 30}% 100%, 0 100%)`};
      break;
    }
    case 'kreis':
      style = {clipPath: `circle(${e * 120}% at ${ox}% ${oy}%)`};
      break;
    case 'schieben':
      style = {transform: `translateX(${(1 - e) * 100 - x * 100}%)`};
      break;
    case 'zoom':
      style = {
        opacity: Math.min(e * 1.6, 1),
        transform: `scale(${1.15 - 0.15 * e - 0.08 * x})`,
      };
      break;
    case 'streifen': {
      if (e >= 1) break;
      const n = 6;
      return (
        <AbsoluteFill>
          {Array.from({length: n}).map((_, i) => {
            const lokal = Math.min(1, Math.max(0, e * 1.6 - (i / n) * 0.6));
            const l = (i / n) * 100;
            const r = 100 - (l + (100 / n) * lokal);
            return (
              <AbsoluteFill key={i} style={{clipPath: `inset(0 ${r}% 0 ${l}%)`}}>
                {children}
              </AbsoluteFill>
            );
          })}
        </AbsoluteFill>
      );
    }
    case 'schnitt':
    default:
      style = {};
  }
  return <AbsoluteFill style={style}>{children}</AbsoluteFill>;
};
