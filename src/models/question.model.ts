import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Question {
  @Field(() => Int)
  id: number;

  @Field()
  question: string;

  @Field(() => [String])
  options: string[];

  @Field(() => Int)
  correctAnswer: number;

  @Field()
  level: string;

  @Field({ nullable: true })
  explanation?: string;
}
