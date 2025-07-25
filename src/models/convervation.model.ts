import { ObjectType, Field, Int } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class Conversation {
  @Field(() => Int)
  id: number;

  @Field()
  title: string

  @Field()
  level: string;

  @Field()
  category: string;

  @Field({ nullable: true })
  duration?: string;

  @Field(() => GraphQLJSON)
  conversation: any;
}


