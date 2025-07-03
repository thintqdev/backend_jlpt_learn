import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { GrammarUsageService } from './grammar_usage.service';
import { GrammarUsage } from '../models/grammar.model';
import { CreateGrammarUsageInput } from './dto/create-grammar_usage.input';
import { UpdateGrammarUsageInput } from './dto/update-grammar_usage.input';

@Resolver(() => GrammarUsage)
export class GrammarUsageResolver {
  constructor(private readonly grammarUsageService: GrammarUsageService) {}

  @Query(() => [GrammarUsage])
  async grammarUsages() {
    return this.grammarUsageService.findAll();
  }

  @Query(() => GrammarUsage, { nullable: true })
  async grammarUsage(@Args('id', { type: () => Int }) id: number) {
    return this.grammarUsageService.findOne(id);
  }

  @Mutation(() => GrammarUsage)
  async createGrammarUsage(@Args('input') input: CreateGrammarUsageInput) {
    return this.grammarUsageService.create(input);
  }

  @Mutation(() => GrammarUsage)
  async updateGrammarUsage(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateGrammarUsageInput,
  ) {
    return this.grammarUsageService.update(id, input);
  }

  @Mutation(() => GrammarUsage)
  async removeGrammarUsage(@Args('id', { type: () => Int }) id: number) {
    return this.grammarUsageService.remove(id);
  }
}
