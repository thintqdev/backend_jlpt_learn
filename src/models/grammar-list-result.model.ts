import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Grammar } from "./grammar.model";

@ObjectType()
export class GrammarListResult {
  @Field(() => [Grammar])
  items: Grammar[];

  @Field(() => Int)
  count: number;
}