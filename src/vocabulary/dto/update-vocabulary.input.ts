import { CreateVocabularyInput } from './create-vocabulary.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVocabularyInput extends PartialType(CreateVocabularyInput) {
  @Field(() => Int)
  id: number;
}
