import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateConversationJsonInput {
  @Field(() => String)
  input: string;
}
