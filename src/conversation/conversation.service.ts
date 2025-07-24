import { Injectable } from '@nestjs/common';
import { CreateConversationInput } from './dto/create-conversation.input';
import { UpdateConversationInput } from './dto/update-conversation.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  create(createConversationInput: CreateConversationInput) {
    return 'This action adds a new conversation';
  }

  findAll() {
    return this.prisma.conversation.findMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} conversation`;
  }

  update(id: number, updateConversationInput: UpdateConversationInput) {
    return `This action updates a #${id} conversation`;
  }

  remove(id: number) {
    return `This action removes a #${id} conversation`;
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
