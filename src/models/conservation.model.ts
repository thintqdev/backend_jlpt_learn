import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Conservation {
  @Field(() => Int)
  id: number;

  @Field()
  level: string;

  @Field()
  category: string;

  @Field({ nullable: true })
  duration?: string;

  @Field(() => [Sentence])
  conservation: Sentence[];
}

@ObjectType()
class Sentence {
  @Field()
  speaker: string;

  @Field()
  text: string;
}
