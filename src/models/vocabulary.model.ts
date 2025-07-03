import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Category } from './category.model';

@ObjectType()
export class Vocabulary {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  kanji?: string;

  @Field({ nullable: true })
  hiragana?: string;

  @Field()
  definition: string;

  @Field({ nullable: true })
  example?: string;

  @Field({ nullable: true })
  translation?: string;

  @Field(() => Boolean)
  is_learned: boolean;

  @Field(() => Int)
  categoryId: number;

  @Field(() => Category)
  category: Category;
}
