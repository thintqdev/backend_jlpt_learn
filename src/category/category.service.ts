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

  async remove(id: number) {
    const vocabularies = await this.prisma.vocabulary.findMany({
      where: {
        categoryId: id,
      },
    });

    if (vocabularies.length > 0) {
      await this.prisma.vocabulary.deleteMany({
        where: {
          categoryId: id,
        },
      });
    }

    return this.prisma.category.delete({ where: { id } });
  }

  async importVocabularyJson(input: string) {
    const data = JSON.parse(input);

    for (const categoryData of data) {
      const { vocabularies, ...categoryInfo } = categoryData;

      // Kiểm tra xem category đã tồn tại chưa
      let category = await this.prisma.category.findFirst({
        where: { name: categoryInfo.name },
      });

      // Nếu chưa có thì tạo mới
      if (!category) {
        category = await this.prisma.category.create({
          data: {
            ...categoryInfo,
            slug: categoryInfo.name.toLowerCase().replace(/\s+/g, '-'),
          },
        });
      }

      // Tạo vocabularies cho category này
      if (vocabularies && vocabularies.length > 0) {
        const vocabularyData = vocabularies.map((vocab) => ({
          ...vocab,
          categoryId: category.id,
        }));

        await this.prisma.vocabulary.createMany({
          data: vocabularyData,
        });
      }
    }

    return true;
  }
}
