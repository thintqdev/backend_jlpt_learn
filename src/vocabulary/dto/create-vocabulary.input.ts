import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateVocabularyInput {
  @Field({ nullable: true }) kanji?: string;
  @Field() definition: string;
  @Field({ nullable: true }) example?: string;
  @Field({ nullable: true }) translation?: string;
  @Field(() => Int) categoryId: number;
  @Field({ nullable: true }) hiragana?: string;
}
