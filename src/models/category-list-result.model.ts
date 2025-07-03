import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Category } from './category.model';

@ObjectType()
export class CategoryListResult {
  @Field(() => [Category])
  items: Category[];

  @Field(() => Int)
  count: number;
}
