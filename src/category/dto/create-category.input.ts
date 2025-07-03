import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field() name: string;
  @Field() nameJp: string;
  @Field() slug: string;
  @Field() level: string;
  @Field({ nullable: true }) description?: string;
}
