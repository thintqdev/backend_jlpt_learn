import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { GrammarExampleService } from './grammar_example.service';
import { GrammarExample } from '../models/grammar.model';
import { CreateGrammarExampleInput } from './dto/create-grammar_example.input';
import { UpdateGrammarExampleInput } from './dto/update-grammar_example.input';

@Resolver(() => GrammarExample)
export class GrammarExampleResolver {
  constructor(private readonly grammarExampleService: GrammarExampleService) {}

  @Query(() => [GrammarExample])
  async grammarExamples() {
    return this.grammarExampleService.findAll();
  }

  @Query(() => GrammarExample, { nullable: true })
  async grammarExample(@Args('id', { type: () => Int }) id: number) {
    return this.grammarExampleService.findOne(id);
  }

  @Mutation(() => GrammarExample)
  async createGrammarExample(@Args('input') input: CreateGrammarExampleInput) {
    return this.grammarExampleService.create(input);
  }

  @Mutation(() => GrammarExample)
  async updateGrammarExample(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateGrammarExampleInput,
  ) {
    return this.grammarExampleService.update(id, input);
  }

  @Mutation(() => GrammarExample)
  async removeGrammarExample(@Args('id', { type: () => Int }) id: number) {
    return this.grammarExampleService.remove(id);
  }
}
