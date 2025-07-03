import { InputType, Field } from '@nestjs/graphql';
import { EnumLevel } from '../level.enum';

@InputType()
export class CreateQuestionInput {
  @Field()
  question: string;

  @Field(() => [String])
  options: string[];

  @Field()
  correctAnswer: number;

  @Field(() => EnumLevel)
  level: EnumLevel;

  @Field({ nullable: true })
  explanation?: string;
}
