import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGrammarExampleInput {
  @Field()
  sentence: string;

  @Field()
  translation: string;

  @Field(() => Int)
  usageId: number;
}
