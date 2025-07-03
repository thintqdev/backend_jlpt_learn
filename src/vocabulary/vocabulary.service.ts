import { Injectable } from '@nestjs/common';
import { CreateVocabularyInput } from './dto/create-vocabulary.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileUpload } from 'graphql-upload-ts';
import * as csv from 'fast-csv';

@Injectable()
export class VocabularyService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateVocabularyInput) {
    return this.prisma.vocabulary.create({ data });
  }

  async findAll() {
    return this.prisma.vocabulary.findMany({ include: { category: true } });
  }

  async findAllByConditions(categoryIds?: number[]) {
    const where =
      categoryIds && categoryIds.length > 0
        ? { categoryId: { in: categoryIds } }
        : {};
    return this.prisma.vocabulary.findMany({
      where,
      include: { category: true },
    });
  }

  async findAllByCategory(categoryId: number) {
    return this.prisma.vocabulary.findMany({
      where: { categoryId },
      include: { category: true },
    });
  }

  async findOne(id: number) {
    return this.prisma.vocabulary.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  async remove(id: number) {
    return this.prisma.vocabulary.delete({ where: { id } });
  }

  async importFromCsv(file: FileUpload, categoryId: number): Promise<boolean> {
    const { createReadStream, filename } = file;

    return new Promise((resolve, reject) => {
      const stream = createReadStream();
      const rows = [];

      stream
        .pipe(csv.parse({ headers: false }))
        .on('error', reject)
        .on('data', async (row) => {
          rows.push(row);
        })
        .on('end', async () => {
          for (const row of rows) {
            const dataRowParseJson = JSON.stringify(row);
            const dataRowInput = {
              kanji: row[1] || '',
              hiragana: row[3] || row[1] || '',
              definition: row[4],
              example: row[5] || '',
              translation: row[6] || '',
              categoryId,
            };

            await this.create(dataRowInput);
          }
          resolve(true);
        });
    });
  }

  async updateStatus(id: number, is_learned: boolean) {
    return this.prisma.vocabulary.update({
      where: { id },
      data: { is_learned: is_learned },
    });
  }
}
