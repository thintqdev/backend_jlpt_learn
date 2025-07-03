import { Module } from '@nestjs/common';
import { GrammarService } from './grammar.service';
import { GrammarResolver } from './grammar.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [GrammarService, GrammarResolver],
})
export class GrammarModule {}
