import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Question } from 'src/models/question.model';

@ObjectType()
export class QuestionPagination {
  @Field(() => [Question])
  data: Question[];

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;

  @Field(() => Int)
  total: number;

  @Field()
  hasNextPage: boolean;

  @Field()
  hasPrevPage: boolean;
}
