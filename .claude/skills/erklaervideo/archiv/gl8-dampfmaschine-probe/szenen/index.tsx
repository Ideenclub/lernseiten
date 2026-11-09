// Designkonzept „Messing & Ruß“ – Klasse 8, Die Dampfmaschine (Probevideo)
// Palette: Anthrazit #15120E, Messing #D9A04E, Kupfer #C2512F, Dampfweiß #F3ECE0, Patina #6FA89E
// Schrift: Bebas Neue (Titel) + Barlow (Text) · Icons: Tabler (Outline) · Übergang: diagonal, Leitfrage als Iris
import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  random,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {geoMercator, geoPath} from 'd3-geo';
import {feature} from 'topojson-client';
import welt from 'world-atlas/countries-50m.json';
import {
  IconArrowRight,
  IconBarbell,
  IconBuildingFactory2,
  IconFlame,
  IconRipple,
  IconSettings,
  IconTrendingDown,
} from '@tabler/icons-react';
import bebas from '@fontsource/bebas-neue/files/bebas-neue-latin-400-normal.woff2';
import barlow500 from '@fontsource/barlow/files/barlow-latin-500-normal.woff2';
import barlow700 from '@fontsource/barlow/files/barlow-latin-700-normal.woff2';
import {ladeSchrift} from '../lib/schrift';
import {imSzene, timing, wortStart, FPS} from '../lib/zeit';
import {Kamerafahrt} from '../lib/bild';
import type {UebergangsConfig} from '../lib/uebergang';

ladeSchrift('Bebas Neue', [{url: bebas, weight: '400'}]);
ladeSchrift('Barlow', [
  {url: barlow500, weight: '500'},
  {url: barlow700, weight: '700'},
]);

const C = {
  bg: '#15120E',
  bg2: '#211B14',
  messing: '#D9A04E',
  kupfer: '#C2512F',
  dampf: '#F3ECE0',
  patina: '#6FA89E',
  grau: '#9A8E7E',
};
const TITEL: React.CSSProperties = {fontFamily: 'Bebas Neue', letterSpacing: '0.02em', lineHeight: 0.92};
const TEXT: React.CSSProperties = {fontFamily: 'Barlow', fontWeight: 500};

export const HINTERGRUND = C.bg;
export const MUSIK: {datei: string; lautstaerke: number} | null = null;
export const UEBERGANG: Record<string, UebergangsConfig> = {
  standard: {art: 'diagonal', dauerSek: 0.7},
  frage: {art: 'kreis', dauerSek: 0.6, ursprung: [50, 55]},
};

// ---------------------------------------------------------------- Hilfen
const ein = (f: number, start: number, dauer = 14) =>
  interpolate(f, [start, start + dauer], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

const Feder = (f: number, start: number, fps: number, damping = 14) =>
  spring({frame: f - start, fps, config: {damping, mass: 0.8}});

const Untergrund: React.FC<{hell?: boolean}> = () => (
  <AbsoluteFill>
    <AbsoluteFill
      style={{background: `radial-gradient(ellipse at 30% 40%, ${C.bg2} 0%, ${C.bg} 70%)`}}
    />
    <svg width="1920" height="1080" style={{position: 'absolute', opacity: 0.07}}>
      <defs>
        <pattern id="raster" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M60 0H0V60" fill="none" stroke={C.messing} strokeWidth="1" />
        </pattern>
        <filter id="korn">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
        </filter>
      </defs>
      <rect width="1920" height="1080" fill="url(#raster)" />
      <rect width="1920" height="1080" filter="url(#korn)" opacity="0.6" />
    </svg>
  </AbsoluteFill>
);

/** Aufsteigende Dampfschwaden (weiche Kreise). */
const Dampf: React.FC<{x: number; y: number; breite: number; anzahl?: number; staerke?: number; seed?: string}> = ({
  x,
  y,
  breite,
  anzahl = 18,
  staerke = 1,
  seed = 'd',
}) => {
  const f = useCurrentFrame();
  return (
    <>
      {Array.from({length: anzahl}).map((_, i) => {
        const periode = 70 + random(`${seed}p${i}`) * 50;
        const t = ((f + random(`${seed}o${i}`) * periode) % periode) / periode;
        const px = x + (random(`${seed}x${i}`) - 0.5) * breite + Math.sin(t * 6 + i) * 18;
        const py = y - t * 260;
        const r = 26 + t * 70;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: px - r,
              top: py - r,
              width: r * 2,
              height: r * 2,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(243,236,224,${0.32 * staerke}) 0%, rgba(243,236,224,0) 70%)`,
              opacity: Math.sin(t * Math.PI),
              filter: 'blur(6px)',
            }}
          />
        );
      })}
    </>
  );
};

const Kapitel: React.FC<{nr: string; text: string; f: number; start: number}> = ({nr, text, f, start}) => {
  const p = ein(f, start, 16);
  return (
    <div
      style={{
        position: 'absolute',
        left: 110,
        top: 90,
        display: 'flex',
        alignItems: 'center',
        gap: 22,
        opacity: p,
        transform: `translateX(${(1 - p) * -40}px)`,
      }}
    >
      <div style={{...TITEL, fontSize: 64, color: C.bg, background: C.messing, padding: '6px 18px 0'}}>{nr}</div>
      <div style={{...TITEL, fontSize: 64, color: C.dampf}}>{text}</div>
    </div>
  );
};

// ---------------------------------------------------------------- 1 Hook
const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s1 = imSzene('hook', 'h1');
  const s2 = imSzene('hook', 'h2');
  const zahlStart = wortStart('h2', 5) - timing.szenen.hook.start;
  const zahl = Math.round(
    interpolate(f, [zahlStart, zahlStart + 22], [0, 250], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.quad),
    }),
  );
  const weltStart = wortStart('h2', 8) - timing.szenen.hook.start;
  const zeile1 = Feder(f, s1, fps);
  const block2 = Feder(f, s2 + 4, fps, 16);
  return (
    <AbsoluteFill>
      <Kamerafahrt datei="bilder/topf.jpg" vonZoom={1.12} bisZoom={1.0} fokus="35% 40%" />
      <AbsoluteFill
        style={{background: 'linear-gradient(90deg, rgba(21,18,14,0.1) 0%, rgba(21,18,14,0.55) 45%, rgba(21,18,14,0.94) 72%)'}}
      />
      <Dampf x={560} y={520} breite={520} anzahl={14} staerke={0.8} seed="hook" />
      <div style={{position: 'absolute', right: 110, top: 190, width: 900, textAlign: 'right'}}>
        <div
          style={{
            ...TEXT,
            fontWeight: 700,
            fontSize: 58,
            color: C.dampf,
            opacity: zeile1,
            transform: `translateY(${(1 - zeile1) * 30}px)`,
          }}
        >
          Ein Topf mit kochendem Wasser.
        </div>
        <div style={{opacity: block2, transform: `translateY(${(1 - block2) * 40}px)`, marginTop: 70}}>
          <div style={{...TEXT, fontSize: 44, color: C.grau}}>vor rund</div>
          <div style={{...TITEL, fontSize: 300, color: C.messing}}>{zahl}</div>
          <div style={{...TITEL, fontSize: 96, color: C.dampf, marginTop: -10}}>Jahren</div>
        </div>
        <div
          style={{
            ...TITEL,
            fontSize: 88,
            color: C.kupfer,
            marginTop: 22,
            opacity: ein(f, weltStart, 10),
            transform: `scale(${0.85 + 0.15 * ein(f, weltStart, 10)})`,
            transformOrigin: 'right center',
          }}
        >
          veränderte die Welt
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- 2 Leitfrage
const Frage: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = imSzene('frage', 'f1', -0.15);
  const woerter = ['Wie', 'funktioniert', 'eine', 'Dampfmaschine'];
  return (
    <AbsoluteFill>
      <Untergrund />
      <AbsoluteFill style={{justifyContent: 'center', paddingLeft: 170}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 20, opacity: ein(f, s - 6)}}>
          <div style={{width: interpolate(ein(f, s - 6, 20), [0, 1], [0, 90]), height: 6, background: C.messing}} />
          <div style={{...TEXT, fontWeight: 700, fontSize: 40, letterSpacing: '0.3em', color: C.messing}}>LEITFRAGE</div>
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', width: 1500, marginTop: 30, columnGap: 36}}>
          {woerter.map((w, i) => {
            const p = Feder(f, s + i * 5, fps, 13);
            return (
              <span
                key={w}
                style={{
                  ...TITEL,
                  fontSize: 190,
                  color: C.dampf,
                  display: 'inline-block',
                  opacity: p,
                  transform: `translateY(${(1 - p) * 90}px)`,
                }}
              >
                {w}
              </span>
            );
          })}
          <span
            style={{
              ...TITEL,
              fontSize: 190,
              color: C.kupfer,
              display: 'inline-block',
              transform: `rotate(${(1 - Feder(f, s + 22, fps, 8)) * -40}deg) scale(${Feder(f, s + 22, fps, 8)})`,
            }}
          >
            ?
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- 3 Prinzip (eigene Schemazeichnung)
const Prinzip: React.FC = () => {
  const f = useCurrentFrame();
  const p1 = imSzene('prinzip', 'p1');
  const p2 = imSzene('prinzip', 'p2');
  const p3 = imSzene('prinzip', 'p3');

  // Kurbeltrieb: Rad bei (1430, 600), Kurbelradius 70, Pleuel 330
  const RX = 1430;
  const RY = 600;
  const r = 70;
  const L = 330;
  const lauf = interpolate(f, [p2, p2 + 20], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const winkel = (f - p2) > 0 ? ((f - p2) * lauf * 0.16) : 0;
  const pinX = RX + r * Math.cos(winkel + Math.PI);
  const pinY = RY + r * Math.sin(winkel + Math.PI);
  const kreuzX = pinX - Math.sqrt(L * L - (pinY - RY) ** 2);
  const kolbenX = kreuzX - 180; // Kolben sitzt im Zylinder

  // Kamerafahrt durch die Zeichnung
  const kam = interpolate(f, [p1, p2, p3, p3 + 60], [0, 0.45, 0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const zoom = interpolate(kam, [0, 0.45, 0.8, 1], [1.28, 1.15, 1.12, 1.0]);
  const tx = interpolate(kam, [0, 0.45, 0.8, 1], [260, 60, -160, 0]);

  const flackern = (i: number) => 0.85 + Math.sin(f * 0.6 + i * 2.1) * 0.12 + random(`fl${f}${i}`) * 0.05;
  const wasserHitze = ein(f, p1 + 10, 40);
  const kesselFarbe = `rgb(${Math.round(interpolate(wasserHitze, [0, 1], [52, 78]))}, ${Math.round(interpolate(wasserHitze, [0, 1], [104, 128]))}, ${Math.round(interpolate(wasserHitze, [0, 1], [140, 150]))})`;
  const dampfFluss = ein(f, p2 - 6, 18);
  const hervor = (start: number) => ein(f, start, 12);

  const Label: React.FC<{x: number; y: number; text: string; start: number; farbe?: string}> = ({
    x,
    y,
    text,
    start,
    farbe = C.messing,
  }) => {
    const p = hervor(start);
    return (
      <g opacity={p} transform={`translate(${x}, ${y + (1 - p) * 20})`}>
        <rect x={-10} y={-46} width={text.length * 24 + 34} height={62} rx={8} fill={C.bg} stroke={farbe} strokeWidth={3} />
        <text x={8} y={0} fill={farbe} style={{fontFamily: 'Barlow', fontWeight: 700, fontSize: 40}}>
          {text}
        </text>
      </g>
    );
  };

  return (
    <AbsoluteFill>
      <Untergrund />
      <AbsoluteFill style={{transform: `translateX(${tx}px) scale(${zoom})`, transformOrigin: '50% 60%'}}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          {/* Feuer */}
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M ${290 + i * 46} 840 q 22 ${-90 * flackern(i)} 0 ${-150 * flackern(i)} q 40 ${60} 24 ${150 * flackern(i)} z`}
              fill={i % 2 ? C.kupfer : C.messing}
              opacity={hervor(p1) * 0.95}
            />
          ))}
          {/* Kohle */}
          {Array.from({length: 9}).map((_, i) => (
            <circle key={i} cx={280 + i * 30} cy={858 + (i % 2) * 8} r={18} fill="#2b2620" stroke="#4a4036" strokeWidth={2} />
          ))}
          {/* Kessel */}
          <rect x={200} y={470} width={420} height={250} rx={110} fill={C.bg2} stroke={C.dampf} strokeWidth={6} />
          <clipPath id="kessel">
            <rect x={206} y={476} width={408} height={238} rx={104} />
          </clipPath>
          <g clipPath="url(#kessel)">
            <rect x={200} y={590} width={420} height={140} fill={kesselFarbe} opacity={0.9} />
            {Array.from({length: 10}).map((_, i) => {
              const t = ((f * 1.4 + i * 17) % 60) / 60;
              return (
                <circle
                  key={i}
                  cx={240 + ((i * 37) % 340)}
                  cy={710 - t * 120}
                  r={5 + (i % 3) * 3}
                  fill="none"
                  stroke={C.dampf}
                  strokeWidth={2}
                  opacity={wasserHitze * (1 - t)}
                />
              );
            })}
          </g>
          {/* Dampfleitung */}
          <path d="M 560 500 C 640 380, 760 380, 820 470 L 820 520" fill="none" stroke={C.dampf} strokeWidth={26} strokeLinecap="round" />
          <path
            d="M 560 500 C 640 380, 760 380, 820 470 L 820 520"
            fill="none"
            stroke={C.patina}
            strokeWidth={12}
            strokeLinecap="round"
            strokeDasharray="30 26"
            strokeDashoffset={-f * 4}
            opacity={dampfFluss}
          />
          {/* Zylinder */}
          <rect x={720} y={520} width={330} height={160} rx={10} fill={C.bg2} stroke={C.dampf} strokeWidth={6} />
          <rect x={733} y={533} width={kolbenX - 733 + 20} height={134} fill={C.patina} opacity={0.35 * dampfFluss} />
          {/* Kolben + Kolbenstange */}
          <rect x={kolbenX} y={534} width={40} height={132} rx={4} fill={C.messing} />
          <rect x={kolbenX + 40} y={592} width={kreuzX - kolbenX - 40} height={16} fill={C.dampf} />
          {/* Pleuel */}
          <line x1={kreuzX} y1={RY} x2={pinX} y2={pinY} stroke={C.messing} strokeWidth={18} strokeLinecap="round" />
          {/* Schwungrad */}
          <g transform={`rotate(${(winkel * 180) / Math.PI}, ${RX}, ${RY})`}>
            <circle cx={RX} cy={RY} r={230} fill="none" stroke={C.dampf} strokeWidth={22} />
            {Array.from({length: 8}).map((_, i) => (
              <line
                key={i}
                x1={RX}
                y1={RY}
                x2={RX + 230 * Math.cos((i * Math.PI) / 4)}
                y2={RY + 230 * Math.sin((i * Math.PI) / 4)}
                stroke={C.dampf}
                strokeWidth={10}
              />
            ))}
          </g>
          <circle cx={RX} cy={RY} r={34} fill={C.messing} />
          <circle cx={pinX} cy={pinY} r={14} fill={C.bg} stroke={C.messing} strokeWidth={6} />
          {/* Beschriftungen */}
          <Label x={250} y={940} text="Kohle" start={p1} farbe={C.kupfer} />
          <Label x={260} y={440} text="Wasser → Dampf" start={p1 + 30} farbe={C.patina} />
          <Label x={760} y={760} text="Kolben" start={p2 + 8} />
          <Label x={1300} y={300} text="Drehbewegung" start={p3 + 10} />
          {/* Drehpfeil */}
          <path
            d={`M ${RX - 280} ${RY - 40} A 285 285 0 0 1 ${RX + 40} ${RY - 282}`}
            fill="none"
            stroke={C.messing}
            strokeWidth={8}
            strokeDasharray="600"
            strokeDashoffset={600 * (1 - hervor(p3 + 10))}
            opacity={hervor(p3 + 10) > 0.02 ? 1 : 0}
            markerEnd={hervor(p3 + 10) > 0.9 ? 'url(#pfeil)' : undefined}
          />
          <defs>
            <marker id="pfeil" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill={C.messing} />
            </marker>
          </defs>
        </svg>
        <Dampf x={860} y={500} breite={60} anzahl={8} staerke={dampfFluss * 0.7} seed="zyl" />
      </AbsoluteFill>
      {/* Maschinen-Symbol, das angetrieben wird */}
      <div
        style={{
          position: 'absolute',
          right: 90,
          bottom: 90,
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          opacity: ein(f, imSzene('prinzip', 'p3', 1.6), 14),
          background: C.messing,
          padding: '14px 30px',
          borderRadius: 14,
        }}
      >
        <IconArrowRight size={54} color={C.bg} stroke={2.4} />
        <IconSettings size={64} color={C.bg} stroke={2} style={{transform: `rotate(${f * 4}deg)`}} />
        <span style={{...TITEL, fontSize: 64, color: C.bg, paddingTop: 6}}>Maschinen laufen</span>
      </div>
      {f < p2 - 4 ? <Kapitel nr="1" text="Kohle macht Dampf" f={f} start={p1 - 4} /> : null}
      {f >= p2 - 4 && f < p3 - 4 ? <Kapitel nr="2" text="Dampf schiebt den Kolben" f={f} start={p2 - 4} /> : null}
      {f >= p3 - 4 ? <Kapitel nr="3" text="Das Rad dreht sich" f={f} start={p3 - 4} /> : null}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- 4 James Watt
const Watt: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = imSzene('watt', 'w1');
  const jahr = Math.round(
    interpolate(f, [s - 4, s + 16], [1700, 1769], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    }),
  );
  const sparStart = wortStart('w1', 7) - timing.szenen.watt.start;
  const balken = interpolate(f, [sparStart, sparStart + 24], [1, 0.38], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const portrait = Feder(f, 0, fps, 18);
  return (
    <AbsoluteFill>
      <Untergrund />
      <div
        style={{
          position: 'absolute',
          left: 120,
          top: 110,
          width: 640,
          height: 860,
          overflow: 'hidden',
          borderRadius: 6,
          boxShadow: `0 0 0 6px ${C.messing}, 0 40px 80px rgba(0,0,0,0.6)`,
          transform: `translateY(${(1 - portrait) * 80}px)`,
          opacity: portrait,
        }}
      >
        <Kamerafahrt datei="bilder/watt.jpg" vonZoom={1.25} bisZoom={1.1} fokus="60% 25%" vonY={2} bisY={-2} />
      </div>
      <div style={{position: 'absolute', left: 860, top: 120, width: 960}}>
        <div style={{...TITEL, fontSize: 280, color: C.messing}}>{jahr}</div>
        <div style={{...TITEL, fontSize: 110, color: C.dampf, opacity: ein(f, s + 10)}}>James Watt</div>
        <div style={{...TEXT, fontSize: 50, color: C.grau, marginTop: 10, opacity: ein(f, s + 18)}}>
          verbessert die Dampfmaschine
        </div>
        <div style={{marginTop: 70, opacity: ein(f, sparStart - 8)}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 18, ...TEXT, fontWeight: 700, fontSize: 46, color: C.dampf}}>
            <IconFlame size={56} color={C.kupfer} stroke={2} /> Kohleverbrauch
            <IconTrendingDown size={56} color={C.patina} stroke={2.2} style={{opacity: ein(f, sparStart + 20)}} />
          </div>
          <div style={{marginTop: 22, width: 860, height: 54, background: '#2c251d', borderRadius: 27}}>
            <div style={{width: `${balken * 100}%`, height: '100%', background: C.kupfer, borderRadius: 27}} />
          </div>
          <div style={{...TITEL, fontSize: 80, color: C.patina, marginTop: 24, opacity: ein(f, sparStart + 18)}}>
            viel sparsamer
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- 5 Folgen: Fabriken ziehen zur Kohle
const deutschland = feature(
  welt as any,
  (welt as any).objects.countries,
) as any;
const DE = deutschland.features.find((g: any) => g.id === '276');

const Folgen: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const r1 = imSzene('folgen', 'r1');
  const r2 = imSzene('folgen', 'r2');
  const ruhrWort = wortStart('r2', 10) - timing.szenen.folgen.start;
  const proj = geoMercator().fitExtent(
    [
      [1060, 80],
      [1780, 1000],
    ],
    DE,
  );
  const pfad = geoPath(proj)(DE) || '';
  const [rx, ry] = proj([7.2, 51.48]) as [number, number];
  const zeichnen = ein(f, r2 - 10, 34);
  const fluss = ein(f, r1, 14);
  const durch = ein(f, r1 + 26, 12);
  return (
    <AbsoluteFill>
      <Untergrund />
      {/* links: Fluss als Antrieb – durchgestrichen */}
      <div style={{position: 'absolute', left: 120, top: 210, width: 860}}>
        <div style={{...TEXT, fontWeight: 700, fontSize: 40, letterSpacing: '0.25em', color: C.messing, opacity: fluss}}>
          VORHER
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 30, marginTop: 16, opacity: fluss}}>
          <IconRipple size={130} color={C.patina} stroke={1.6} />
          <div>
            <div style={{position: 'relative', display: 'inline-block'}}>
              <div style={{...TITEL, fontSize: 120, color: C.dampf}}>Wasserkraft</div>
              <div
                style={{
                  position: 'absolute',
                  left: -8,
                  top: '44%',
                  height: 12,
                  width: `${durch * 106}%`,
                  background: C.kupfer,
                  transform: 'rotate(-3deg)',
                  borderRadius: 6,
                }}
              />
            </div>
            <div style={{...TEXT, fontSize: 44, color: C.grau}}>Fabriken stehen am Fluss</div>
          </div>
        </div>
        <div style={{...TEXT, fontWeight: 700, fontSize: 40, letterSpacing: '0.25em', color: C.messing, marginTop: 100, opacity: ein(f, r2)}}>
          JETZT
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 30, marginTop: 16, opacity: ein(f, r2 + 4)}}>
          <IconBuildingFactory2 size={130} color={C.messing} stroke={1.6} />
          <div>
            <div style={{...TITEL, fontSize: 120, color: C.dampf}}>Dampfkraft</div>
            <div style={{...TEXT, fontSize: 44, color: C.grau}}>Fabriken entstehen bei der Kohle</div>
          </div>
        </div>
      </div>
      {/* rechts: Karte */}
      <svg width="1920" height="1080" style={{position: 'absolute', inset: 0}}>
        <path
          d={pfad}
          fill={C.bg2}
          fillOpacity={zeichnen}
          stroke={C.dampf}
          strokeWidth={4}
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset={1 - zeichnen}
        />
        {[0, 1, 2].map((i) => {
          const t = ((f - ruhrWort + i * 15) % 45) / 45;
          return f > ruhrWort ? (
            <circle key={i} cx={rx} cy={ry} r={20 + t * 90} fill="none" stroke={C.kupfer} strokeWidth={5} opacity={1 - t} />
          ) : null;
        })}
        {f >= ruhrWort - 4 ? <circle cx={rx} cy={ry} r={20 * Feder(f, ruhrWort - 4, fps, 10)} fill={C.kupfer} /> : null}
      </svg>
      {[
        [-90, -70],
        [70, -95],
        [110, 40],
        [-60, 80],
      ].map(([dx, dy], i) => {
        const p = Feder(f, ruhrWort + 6 + i * 4, fps, 11);
        return (
          <div key={i} style={{position: 'absolute', left: rx + dx - 28, top: ry + dy - 28, transform: `scale(${p})`}}>
            <IconBuildingFactory2 size={56} color={C.messing} stroke={2} />
          </div>
        );
      })}
      <div
        style={{
          position: 'absolute',
          left: rx + 30,
          top: ry + 120,
          ...TITEL,
          fontSize: 84,
          color: C.dampf,
          background: C.kupfer,
          padding: '8px 22px 0',
          opacity: ein(f, ruhrWort, 10),
          transform: `translateY(${(1 - ein(f, ruhrWort, 10)) * 20}px)`,
        }}
      >
        Ruhrgebiet
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- 6 Ende: 3 Kernpunkte + Denkfrage
const Ende: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const basis = timing.szenen.ende.start;
  const e2 = imSzene('ende', 'e2');
  const punkte = [
    {icon: IconSettings, text: 'Dampf wird Bewegung', wort: 2},
    {icon: IconBuildingFactory2, text: 'Fabriken ziehen zur Kohle', wort: 5},
    {icon: IconArrowRight, text: 'Industrialisierung nimmt Fahrt auf', wort: 9},
  ];
  const dimm = interpolate(f, [e2 - 6, e2 + 8], [1, 0.25], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const frage = Feder(f, e2 + 2, fps, 15);
  return (
    <AbsoluteFill>
      <Untergrund />
      <div style={{position: 'absolute', left: 120, top: 90, ...TITEL, fontSize: 72, color: C.messing, opacity: ein(f, 0) * dimm}}>
        Kurz gemerkt
      </div>
      <div style={{position: 'absolute', left: 120, top: 210, display: 'flex', gap: 40, opacity: dimm}}>
        {punkte.map((pt, i) => {
          const p = Feder(f, wortStart('e1', pt.wort) - basis - 4, fps, 14);
          const Ico = pt.icon;
          return (
            <div
              key={i}
              style={{
                width: 530,
                height: 380,
                background: C.bg2,
                border: `3px solid ${i === 2 ? C.kupfer : C.messing}`,
                borderRadius: 18,
                padding: 40,
                boxSizing: 'border-box',
                opacity: p,
                transform: `translateY(${(1 - p) * 120}px) rotate(${(1 - p) * (i - 1) * 4}deg)`,
              }}
            >
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                <Ico size={92} color={i === 2 ? C.kupfer : C.messing} stroke={1.8} />
                <div style={{...TITEL, fontSize: 110, color: '#3a3127'}}>{i + 1}</div>
              </div>
              <div style={{...TEXT, fontWeight: 700, fontSize: 52, color: C.dampf, marginTop: 34, lineHeight: 1.12}}>
                {pt.text}
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 120,
          right: 120,
          bottom: 110,
          display: 'flex',
          alignItems: 'center',
          gap: 40,
          opacity: frage,
          transform: `translateY(${(1 - frage) * 60}px)`,
        }}
      >
        <div style={{background: C.kupfer, borderRadius: '50%', width: 170, height: 170, display: 'grid', placeItems: 'center', flexShrink: 0}}>
          <IconBarbell size={100} color={C.dampf} stroke={1.8} />
        </div>
        <div>
          <div style={{...TEXT, fontWeight: 700, fontSize: 38, letterSpacing: '0.25em', color: C.kupfer}}>DENK MAL NACH</div>
          <div style={{...TITEL, fontSize: 104, color: C.dampf, marginTop: 6}}>
            Welche Maschine ersetzt heute deine Muskelkraft?
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const SZENEN: Record<string, React.FC> = {
  hook: Hook,
  frage: Frage,
  prinzip: Prinzip,
  watt: Watt,
  folgen: Folgen,
  ende: Ende,
};

// ---------------------------------------------------------------- Vorschaubild
export const Vorschaubild: React.FC = () => (
  <AbsoluteFill style={{background: C.bg}}>
    <div style={{position: 'absolute', right: 0, top: 0, width: 1150, height: 1080, overflow: 'hidden'}}>
      <Img src={staticFile('bilder/topf.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '30% 40%'}} />
      <AbsoluteFill style={{background: `linear-gradient(90deg, ${C.bg} 0%, rgba(21,18,14,0) 40%)`}} />
    </div>
    <div style={{position: 'absolute', left: 110, top: 110, width: 900}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
        <IconSettings size={70} color={C.messing} stroke={2} />
        <span style={{...TEXT, fontWeight: 700, fontSize: 40, letterSpacing: '0.25em', color: C.messing}}>KLASSE 8 · GL</span>
      </div>
      <div style={{...TITEL, fontSize: 210, color: C.dampf, marginTop: 24}}>Die Dampf&shy;maschine</div>
      <div style={{width: 160, height: 10, background: C.kupfer, marginTop: 40}} />
      <div style={{...TEXT, fontWeight: 700, fontSize: 56, color: C.grau, marginTop: 34, lineHeight: 1.15}}>
        Wie Wasserdampf die Welt verändert hat
      </div>
    </div>
  </AbsoluteFill>
);

void FPS;
