import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VocabularyService } from './vocabulary.service';
import { CreateVocabularyInput } from './dto/create-vocabulary.input';
import { Vocabulary } from 'src/models/vocabulary.model';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { UpdateVocabularyStatusInput } from './dto/update-is-learn';

@Resolver(() => Vocabulary)
export class VocabularyResolver {
  constructor(private readonly vocabularyService: VocabularyService) {}

  @Mutation(() => Vocabulary)
  createVocabulary(
    @Args('input') createVocabularyInput: CreateVocabularyInput,
  ) {
    return this.vocabularyService.create(createVocabularyInput);
  }

  @Query(() => [Vocabulary], { name: 'vocabularies' })
  findAll() {
    return this.vocabularyService.findAll();
  }

  @Query(() => [Vocabulary], { name: 'vocabulariesByConditions' })
  findAllByConditions(
    @Args('categoryIds', { type: () => [Int], nullable: true })
    categoryIds?: number[],
  ) {
    return this.vocabularyService.findAllByConditions(categoryIds);
  }

  @Query(() => [Vocabulary], { name: 'vocabulariesByCategory' })
  findAllByCategory(
    @Args('categoryId', { type: () => Int }) categoryId: number,
  ) {
    return this.vocabularyService.findAllByCategory(categoryId);
  }

  @Query(() => Vocabulary, { name: 'vocabulary' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.vocabularyService.findOne(id);
  }

  @Mutation(() => Vocabulary)
  removeVocabulary(@Args('id', { type: () => Int }) id: number) {
    return this.vocabularyService.remove(id);
  }

  @Mutation(() => Boolean)
  importVocabularyCsv(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
    @Args('categoryId', { type: () => Int }) categoryId: number,
  ): Promise<boolean> {
    return this.vocabularyService.importFromCsv(file, categoryId);
  }

  @Mutation(() => Vocabulary)
  updateVocabularyStatus(@Args('input') input: UpdateVocabularyStatusInput) {
    return this.vocabularyService.updateStatus(input.id, input.is_learned);
  }
}
