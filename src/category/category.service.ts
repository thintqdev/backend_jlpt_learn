import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateCategoryInput) {
    return this.prisma.category.create({ data });
  }

  async findAll(page?: number, pageSize?: number) {
    if (!page || !pageSize) {
      const items = await this.prisma.category.findMany();
      return { items, count: items.length };
    }
    // Phân trang
    const skip = (page - 1) * pageSize;
    const [items, count] = await Promise.all([
      this.prisma.category.findMany({
        skip,
        take: pageSize,
      }),
      this.prisma.category.count(),
    ]);
    return { items, count };
  }

  findOne(id: number) {
    return this.prisma.category.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateCategoryInput) {
    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }
}
