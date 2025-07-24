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


  async importFromCsv(file: FileUpload): Promise<boolean> {
    const { createReadStream, filename } = file;
    console.log('Importing:', filename);
    console.log('Time', Date.now())

    const grammars = await csvToGrammarJson(createReadStream());
    console.log(JSON.stringify(grammars))

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
