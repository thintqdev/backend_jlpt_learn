import { CreateGrammarExampleInput } from './create-grammar_example.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGrammarExampleInput extends PartialType(
  CreateGrammarExampleInput,
) {
  @Field(() => Int)
  id: number;
}
