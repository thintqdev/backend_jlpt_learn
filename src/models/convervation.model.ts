import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Conversation {
  @Field(() => Int)
  id: number;

  @Field()
  level: string;

  @Field()
  category: string;

  @Field({ nullable: true })
  duration?: string;

  @Field(() => [Sentence])
  conversation: Sentence[];
}

@ObjectType()
class Sentence {
  @Field()
  speaker: string;

  @Field()
  text: string;
}
