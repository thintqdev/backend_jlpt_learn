import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { GrammarService } from './grammar.service';
import { Grammar } from '../models/grammar.model';
import { CreateGrammarInput } from './dto/create-grammar.input';
import { UpdateGrammarInput } from './dto/update-grammar.input';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';

@Resolver(() => Grammar)
export class GrammarResolver {
  constructor(private readonly grammarService: GrammarService) {}

  @Query(() => [Grammar])
  async grammars() {
    return this.grammarService.findAll();
  }

  @Query(() => Grammar, { nullable: true })
  async grammar(@Args('id', { type: () => Int }) id: number) {
    return this.grammarService.findOne(id);
  }

  @Mutation(() => Grammar)
  async createGrammar(@Args('input') input: CreateGrammarInput) {
    return this.grammarService.create(input);
  }

  @Mutation(() => Grammar)
  async updateGrammar(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateGrammarInput,
  ) {
    return this.grammarService.update(id, input);
  }

  @Mutation(() => Grammar)
  async removeGrammar(@Args('id', { type: () => Int }) id: number) {
    return this.grammarService.remove(id);
  }

  @Mutation(() => Boolean)
  importGrammarCsv(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ): Promise<boolean> {
    return this.grammarService.importFromCsv(file);
  }
}
