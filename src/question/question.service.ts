import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { FileUpload } from 'graphql-upload-ts';
import * as csv from 'fast-csv';
import { EnumLevel } from './level.enum';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuestionInput: CreateQuestionInput) {
    const { question, options, correctAnswer, level, explanation } =
      createQuestionInput;
    return this.prisma.question.create({
      data: {
        question,
        options,
        correctAnswer,
        level,
        explanation,
      },
    });
  }

  async findAll(page = 1, pageSize = 10) {
    const skip = (page - 1) * pageSize;
    const [total, data] = await Promise.all([
      this.prisma.question.count(),
      this.prisma.question.findMany({
        skip,
        take: pageSize,
        orderBy: { id: 'asc' },
      }),
    ]);
    const hasNextPage = skip + pageSize < total;
    const hasPrevPage = page > 1;
    return {
      data,
      page,
      pageSize,
      total,
      hasNextPage,
      hasPrevPage,
    };
  }

  async findOne(id: number) {
    return this.prisma.question.findUnique({ where: { id } });
  }

  async update(id: number, updateQuestionInput: UpdateQuestionInput) {
    const data = { ...updateQuestionInput };
    delete data.id;
    return this.prisma.question.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number) {
    return this.prisma.question.delete({ where: { id } });
  }

  async importFromCsv(file: FileUpload): Promise<boolean> {
    const { createReadStream } = file;
    return new Promise((resolve, reject) => {
      const stream = createReadStream();
      const rows = [];
      stream
        .pipe(csv.parse({ headers: false }))
        .on('error', reject)
        .on('data', (row) => {
          rows.push(row);
        })
        .on('end', async () => {
          for (const row of rows) {
            let options = [];
            try {
              const arrStr = row[1].replace(/'/g, '"');
              options = JSON.parse(arrStr);
            } catch {
              options = Array.isArray(row[1]) ? row[1] : [];
            }
            const dataRowInput: CreateQuestionInput = {
              question: row[0],
              options,
              correctAnswer: Number(row[2]),
              level: row[3],
              explanation: row[4] || '',
            };
            await this.create(dataRowInput);
          }
          resolve(true);
        });
    });
  }

  async getRandomQuestion(level: EnumLevel, count: number) {
    const questions = await this.prisma.question.findMany({
      where: { level },
    });
    const randomQuestions = questions
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
    return randomQuestions;
  }
}
