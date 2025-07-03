import { Module } from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { VocabularyResolver } from './vocabulary.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CategoryService } from 'src/category/category.service';
import { CategoryResolver } from 'src/category/category.resolver';

@Module({
  providers: [
    VocabularyResolver,
    VocabularyService,
    CategoryService,
    CategoryResolver,
  ],
  exports: [VocabularyService],
  imports: [PrismaModule],
})
export class VocabularyModule {}
