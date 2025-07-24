import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Conversation {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  level: string;

  @Field()
  category: string;

  @Field({ nullable: true })
  duration?: string;

  @Field(() => [Sentence])
  get conversation(): Sentence[] {
    try {
      return JSON.parse(this._conversation);
    } catch (e) {
      return [];
    }
  }

  _conversation: string;
}

@ObjectType()
class Sentence {
  @Field()
  speaker: string;

  @Field()
  text: string;
}
