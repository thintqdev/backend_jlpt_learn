import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { VocabularyModule } from '../vocabulary/vocabulary.module';

@Module({
  imports: [PrismaModule, VocabularyModule],
  providers: [CategoryResolver, CategoryService],
  exports: [CategoryService, CategoryResolver],
})
export class CategoryModule {}
