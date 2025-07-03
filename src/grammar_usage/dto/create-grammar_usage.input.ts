import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGrammarUsageInput {
  @Field()
  structure: string;

  @Field()
  meaning: string;

  @Field({ nullable: true })
  note?: string;

  @Field(() => Int)
  grammarId: number;
}
