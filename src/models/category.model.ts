import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Vocabulary } from './vocabulary.model';

@ObjectType()
export class Category {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  nameJp: string;

  @Field()
  slug: string;

  @Field()
  level: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [Vocabulary])
  words: Vocabulary[];
}
