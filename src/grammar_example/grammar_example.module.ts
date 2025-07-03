import { Module } from '@nestjs/common';
import { GrammarExampleService } from './grammar_example.service';
import { GrammarExampleResolver } from './grammar_example.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [GrammarExampleService, GrammarExampleResolver],
})
export class GrammarExampleModule {}
