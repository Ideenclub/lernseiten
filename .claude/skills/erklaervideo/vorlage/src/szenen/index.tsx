// GERÜST – für jedes Video komplett neu gestalten (Designkonzept siehe SKILL.md, Schritt 3).
// Konzept: <Name> · Palette: … · Schriften: … · Icons: … · Übergang: … · Bewegung: …
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {imSzene} from '../lib/zeit';
import type {UebergangsConfig} from '../lib/uebergang';
// Beispiel Schrift:
// import inter700 from '@fontsource/inter/files/inter-latin-700-normal.woff2';
// import {ladeSchrift} from '../lib/schrift';
// ladeSchrift('Inter', [{url: inter700, weight: '700'}]);

export const HINTERGRUND = '#101010';
export const MUSIK: {datei: string; lautstaerke: number} | null = null; // z. B. {datei: 'audio/musik.mp3', lautstaerke: 0.08}
export const UEBERGANG: Record<string, UebergangsConfig> = {
  standard: {art: 'blende', dauerSek: 0.6},
  // szenenId: {art: 'kreis', dauerSek: 0.6, ursprung: [50, 50]},
};

const Start: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = imSzene('start', 'a1'); // Frame, an dem Satz a1 beginnt
  const p = spring({frame: f - s, fps});
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <div style={{color: 'white', fontSize: 80, fontFamily: 'sans-serif', opacity: p, transform: `translateY(${interpolate(p, [0, 1], [40, 0])}px)`}}>
        Gerüst
      </div>
    </AbsoluteFill>
  );
};

// Ein Eintrag pro Szenen-ID aus drehbuch.json
export const SZENEN: Record<string, React.FC> = {start: Start};

export const Vorschaubild: React.FC = () => (
  <AbsoluteFill style={{background: HINTERGRUND, color: 'white', justifyContent: 'center', alignItems: 'center', fontSize: 120}}>
    Titel
  </AbsoluteFill>
);
