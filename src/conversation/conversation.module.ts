import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationResolver } from './conversation.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ConversationResolver, ConversationService],
  imports: [PrismaModule]
})
export class ConversationModule {}
