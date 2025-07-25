import { Injectable } from '@nestjs/common';
import { CreateConversationInput } from './dto/create-conversation.input';
import { UpdateConversationInput } from './dto/update-conversation.input';
import { PrismaService } from 'src/prisma/prisma.service';


interface FindAllPaginatedOptions {
  search?: string;
  sort?: string; // 'asc' | 'desc'
  page?: number;
  pageSize?: number;
}


@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) { }

  create(createConversationInput: CreateConversationInput) {
    return 'This action adds a new conversation';
  }

  findAll() {
    return this.prisma.conversation.findMany()
  }

  async findAllPaginated(options: FindAllPaginatedOptions) {
    const {
      search,
      sort = 'desc',
      page = 1,
      pageSize = 10,
    } = options;

    const where: any = search
      ? {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
        ],
      }
      : {};

    return this.prisma.conversation.findMany({
      where,
      orderBy: {
        id: sort === 'asc' ? 'asc' : 'desc',
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  // Find one conversation by id
  async findOne(id: number) {
    return this.prisma.conversation.findUnique({
      where: { id },
    });
  }

  // Remove one conversation by id
  async remove(id: number) {
    return this.prisma.conversation.delete({
      where: { id },
    });
  }

  update(id: number, updateConversationInput: UpdateConversationInput) {
    return `This action updates a #${id} conversation`;
  }


  async createJson(input: string) {
    const data = JSON.parse(input);
    await this.prisma.conversation.createMany({
      data: data.map(item => ({
        title: item.title,
        level: item.level,
        category: item.category,
        duration: item.duration,
        conversation: item?.conversation || null,
      })),
    });
    return true;
  }
}
