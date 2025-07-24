import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGrammarInput } from './dto/create-grammar.input';
import { FileUpload } from 'graphql-upload-ts';
import { csvToGrammarJson } from 'src/utils/csv2json.util';

@Injectable()
export class GrammarService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.grammar.findMany({
      include: {
        usages: {
          include: {
            examples: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.grammar.findUnique({
      where: { id },
      include: {
        usages: {
          include: {
            examples: true,
          },
        },
      },
    });
  }

  async create(data: CreateGrammarInput) {
    return this.prisma.grammar.create({
      data,
    });
  }

  async update(id: number, data: any) {
    return this.prisma.grammar.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.grammar.delete({
      where: { id },
    });
  }

  // async importFromCsv(file: FileUpload): Promise<boolean> {
  //   const grammarMap = new Map<string, number>();
  //   const usageMap = new Map<string, number>();
  //   const { createReadStream, filename } = file;
  //   console.log(filename);

  //   return new Promise((resolve, reject) => {
  //     const stream = createReadStream();
  //     const rows: any = [];

  //     stream
  //       .pipe(csv.parse({ headers: false }))
  //       .on('error', reject)
  //       .on('data', async (row) => {
  //         rows.push(row);
  //       })
  //       .on('end', async () => {
  //         for (const row of rows) {
  //           const grammarKey = `${row[0]}_${row[1]}`;
  //           let grammarId = grammarMap.get(grammarKey);

  //           if (!grammarId) {
  //             const data: any = {
  //               title: row[0],
  //               level: row[1],
  //               definition: row[2],
  //               description: row[3] || null,
  //             };

  //             const grammar = await this.prisma.grammar.create({
  //               data,
  //             });
  //             grammarId = grammar.id;
  //             grammarMap.set(grammarKey, grammarId);
  //           }
  //           const usageKey = `${grammarId}_${row[4]}`;
  //           let usageId = usageMap.get(usageKey);

  //           if (!usageId) {
  //             const usage = await this.prisma.grammarUsage.create({
  //               data: {
  //                 structure: row[4],
  //                 meaning: row[5],
  //                 note: row[6] || null,
  //                 grammarId,
  //               },
  //             });
  //             usageId = usage.id;
  //             usageMap.set(usageKey, usageId);

  //             await this.prisma.grammarExample.create({
  //               data: {
  //                 sentence: row[7],
  //                 translation: row[8],
  //                 usageId,
  //               },
  //             });
  //             resolve(true);
  //           }
  //         }
  //       });
  //   });
  // }

  async importFromCsv(file: FileUpload): Promise<boolean> {
    const { createReadStream, filename } = file;
    console.log('Importing:', filename);

    const grammars = await csvToGrammarJson(createReadStream());

    for (const grammar of grammars) {
      const createdGrammar = await this.prisma.grammar.create({
        data: {
          title: grammar.title,
          level: grammar.level,
          definition: grammar.definition,
          description: grammar.description,
        },
      });

      for (const usage of grammar.usages) {
        const createdUsage = await this.prisma.grammarUsage.create({
          data: {
            structure: usage.structure,
            meaning: usage.meaning,
            note: usage.note,
            grammarId: createdGrammar.id,
          },
        });

        for (const example of usage.examples) {
          await this.prisma.grammarExample.create({
            data: {
              sentence: example.sentence,
              translation: example.translation,
              usageId: createdUsage.id,
            },
          });
        }
      }
    }

    return true;
  }
}
