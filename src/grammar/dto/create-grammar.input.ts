import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateGrammarInput {
  @Field() title: string;
  @Field() level: string;
  @Field() definition: string;
  @Field({ nullable: true }) description?: string;
}
