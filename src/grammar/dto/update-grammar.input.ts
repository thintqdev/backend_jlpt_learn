import { CreateGrammarInput } from './create-grammar.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGrammarInput extends PartialType(CreateGrammarInput) {
  @Field(() => Int)
  id: number;
}
