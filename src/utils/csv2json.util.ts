import { parse } from 'fast-csv';
import { Readable } from 'stream';

export interface GrammarExample {
  sentence: string;
  translation: string;
}

export interface GrammarUsage {
  structure: string;
  meaning: string;
  note: string | null;
  examples: GrammarExample[];
}

export interface GrammarItem {
  title: string;
  level: string;
  definition: string;
  description: string | null;
  usages: GrammarUsage[];
}

export async function csvToGrammarJson(
  stream: Readable,
): Promise<GrammarItem[]> {
  return new Promise((resolve, reject) => {
    const grammarMap = new Map<string, GrammarItem>();

    stream
      .pipe(parse({ headers: false, trim: true }))
      .on('error', reject)
      .on('data', (row: string[]) => {
        const [
          rawTitle,
          rawLevel,
          rawDefinition,
          rawDescription,
          rawStructure,
          rawMeaning,
          rawNote,
          rawSentence,
          rawTranslation,
        ] = row.map((item) => item?.trim().normalize() || '');

        const grammarKey = `${rawTitle}_${rawLevel}`;

        if (!grammarMap.has(grammarKey)) {
          grammarMap.set(grammarKey, {
            title: rawTitle,
            level: rawLevel,
            definition: rawDefinition,
            description: rawDescription || null,
            usages: [],
          });
        }

        const grammar = grammarMap.get(grammarKey)!;

        let usage = grammar.usages.find((u) => u.structure === rawStructure);

        if (!usage) {
          usage = {
            structure: rawStructure,
            meaning: rawMeaning,
            note: rawNote || null,
            examples: [],
          };
          grammar.usages.push(usage);
        }

        usage.examples.push({
          sentence: rawSentence,
          translation: rawTranslation,
        });
      })
      .on('end', () => {
        resolve(Array.from(grammarMap.values()));
      });
  });
}
