import React from 'react';
import {AbsoluteFill, Audio, Composition, Sequence, Still, staticFile, useCurrentFrame} from 'remotion';
import {timing, FPS} from './lib/zeit';
import {UebergangsHuelle} from './lib/uebergang';
import {SZENEN, UEBERGANG, MUSIK, HINTERGRUND, Vorschaubild} from './szenen';

const Video: React.FC = () => {
  const frame = useCurrentFrame();
  const ids = timing.reihenfolge;
  return (
    <AbsoluteFill style={{background: HINTERGRUND}}>
      {ids.map((id, i) => {
        const s = timing.szenen[id];
        const Komp = SZENEN[id];
        if (!Komp) throw new Error(`Szene "${id}" fehlt in src/szenen/index.tsx`);
        const cfg = UEBERGANG[id] ?? UEBERGANG.standard;
        const u = cfg.art === 'schnitt' ? 0 : Math.round(cfg.dauerSek * FPS);
        const naechste = ids[i + 1] ? (UEBERGANG[ids[i + 1]] ?? UEBERGANG.standard) : null;
        const uN = naechste && naechste.art !== 'schnitt' ? Math.round(naechste.dauerSek * FPS) : 0;
        const von = Math.max(0, s.start - (i === 0 ? 0 : Math.round(u / 2)));
        const bis = Math.min(timing.gesamtFrames, s.end + Math.round(uN / 2));
        const p = i === 0 || u === 0 ? 1 : (frame - von) / u;
        const q = uN === 0 ? 0 : (frame - (bis - uN)) / uN;
        return (
          <Sequence key={id} from={von} durationInFrames={bis - von} name={id}>
            <UebergangsHuelle cfg={cfg} p={p} q={naechste?.art === 'schieben' ? q : 0}>
              <Komp />
            </UebergangsHuelle>
          </Sequence>
        );
      })}
      <Audio src={staticFile('audio/stimme.wav')} />
      {MUSIK ? <Audio src={staticFile(MUSIK.datei)} volume={MUSIK.lautstaerke} loop /> : null}
    </AbsoluteFill>
  );
};

export const Root: React.FC = () => (
  <>
    <Composition
      id="Video"
      component={Video}
      durationInFrames={timing.gesamtFrames}
      fps={timing.fps}
      width={timing.breite}
      height={timing.hoehe}
    />
    <Still id="Vorschaubild" component={Vorschaubild} width={1920} height={1080} />
  </>
);
