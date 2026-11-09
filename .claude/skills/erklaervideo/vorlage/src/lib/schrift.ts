// Schriften lokal laden (OFL-lizenzierte Fontsource-Pakete, werden ins Video gerendert).
// Neue Schrift: npm install @fontsource/<name>  und hier bzw. in der Szene einbinden:
//   import f700 from '@fontsource/<name>/files/<name>-latin-700-normal.woff2';
//   ladeSchrift('Name', [{url: f700, weight: '700'}]);
import {loadFont} from '@remotion/fonts';

export const ladeSchrift = (
  family: string,
  dateien: {url: string; weight?: string; style?: string}[],
) => {
  for (const d of dateien) {
    loadFont({family, url: d.url, weight: d.weight ?? '400', style: d.style ?? 'normal'}).catch(
      (e) => console.error('Schrift konnte nicht geladen werden', family, e),
    );
  }
};
