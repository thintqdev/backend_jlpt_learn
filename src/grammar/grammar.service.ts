import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGrammarInput } from './dto/create-grammar.input';

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
}
