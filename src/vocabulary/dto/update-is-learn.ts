import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateVocabularyStatusInput {
  @Field(() => Int)
  id: number;

  @Field(() => Boolean)
  is_learned: boolean;
}
