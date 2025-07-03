import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class GrammarExample {
  @Field(() => Int)
  id: number;

  @Field()
  sentence: string;

  @Field()
  translation: string;

  @Field(() => Int)
  usageId: number;
}

@ObjectType()
export class GrammarUsage {
  @Field(() => Int)
  id: number;

  @Field()
  structure: string;

  @Field()
  meaning: string;

  @Field({ nullable: true })
  note?: string;

  @Field(() => Int)
  grammarId: number;

  @Field(() => [GrammarExample])
  examples: GrammarExample[];
}

@ObjectType()
export class Grammar {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  level: string;

  @Field()
  definition: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [GrammarUsage])
  usages: GrammarUsage[];
}
