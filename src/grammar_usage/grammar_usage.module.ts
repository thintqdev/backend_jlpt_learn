import { Module } from '@nestjs/common';
import { GrammarUsageService } from './grammar_usage.service';
import { GrammarUsageResolver } from './grammar_usage.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [GrammarUsageService, GrammarUsageResolver],
})
export class GrammarUsageModule {}
