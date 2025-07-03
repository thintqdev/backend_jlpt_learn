import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GrammarUsageService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.grammarUsage.findMany({
      include: { examples: true },
    });
  }

  async findOne(id: number) {
    return this.prisma.grammarUsage.findUnique({
      where: { id },
      include: { examples: true },
    });
  }

  async create(data: any) {
    return this.prisma.grammarUsage.create({ data });
  }

  async update(id: number, data: any) {
    return this.prisma.grammarUsage.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.grammarUsage.delete({
      where: { id },
    });
  }
}
