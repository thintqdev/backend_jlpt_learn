import { CreateGrammarUsageInput } from './create-grammar_usage.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGrammarUsageInput extends PartialType(
  CreateGrammarUsageInput,
) {
  @Field(() => Int)
  id: number;
}
