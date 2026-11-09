// Foto mit langsamer Kamerafahrt (Zoom/Schwenk). Bilder liegen in public/bilder/.
import React from 'react';
import {Img, interpolate, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';

type Props = {
  datei: string; // z. B. 'bilder/watt.jpg'
  vonZoom?: number;
  bisZoom?: number;
  vonX?: number; // Verschiebung in Prozent
  bisX?: number;
  vonY?: number;
  bisY?: number;
  fokus?: string; // object-position, z. B. '50% 30%'
  dauer?: number; // Frames; Standard: ganze Sequenz
  style?: React.CSSProperties;
};

export const Kamerafahrt: React.FC<Props> = ({
  datei,
  vonZoom = 1.05,
  bisZoom = 1.18,
  vonX = 0,
  bisX = 0,
  vonY = 0,
  bisY = 0,
  fokus = '50% 50%',
  dauer,
  style,
}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const d = dauer ?? durationInFrames;
  const p = interpolate(frame, [0, d], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const z = vonZoom + (bisZoom - vonZoom) * p;
  const x = vonX + (bisX - vonX) * p;
  const y = vonY + (bisY - vonY) * p;
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', ...style}}>
      <Img
        src={staticFile(datei)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: fokus,
          transform: `scale(${z}) translate(${x}%, ${y}%)`,
          willChange: 'transform',
        }}
      />
    </div>
  );
};
