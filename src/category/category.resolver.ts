import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from '../models/category.model';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { CategoryListResult } from '../models/category-list-result.model';
import { VocabularyService } from '../vocabulary/vocabulary.service';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly vocabularyService: VocabularyService,
  ) {}

  @Mutation(() => Category)
  createCategory(@Args('input') input: CreateCategoryInput) {
    return this.categoryService.create(input);
  }

  @Query(() => CategoryListResult, { name: 'categories' })
  async findAll() {
    const items = await this.categoryService.findAll();
    const count = items.length;
    return { items, count };
  }

  @Query(() => Category, { name: 'category' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.findOne(id);
  }

  @Mutation(() => Category)
  updateCategory(@Args('input') input: UpdateCategoryInput) {
    return this.categoryService.update(input.id, input);
  }

  @Mutation(() => Category)
  removeCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.remove(id);
  }

  @ResolveField(() => [Category])
  async words(@Parent() category: Category) {
    return this.vocabularyService.findAllByCategory(category.id);
  }
}
