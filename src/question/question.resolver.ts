import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuestionService } from './question.service';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { Question } from 'src/models/question.model';
import { QuestionPagination } from 'src/models/question-pagination.model';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { EnumLevel } from './level.enum';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Mutation(() => Question)
  createQuestion(
    @Args('createQuestionInput') createQuestionInput: CreateQuestionInput,
  ) {
    return this.questionService.create(createQuestionInput);
  }

  @Query(() => QuestionPagination, { name: 'questions' })
  findAll(
    @Args('page', { type: () => Int, nullable: true }) page = 1,
    @Args('pageSize', { type: () => Int, nullable: true }) pageSize = 10,
  ) {
    return this.questionService.findAll(page, pageSize);
  }

  @Query(() => Question, { name: 'question' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.questionService.findOne(id);
  }

  @Mutation(() => Question)
  updateQuestion(
    @Args('updateQuestionInput') updateQuestionInput: UpdateQuestionInput,
  ) {
    return this.questionService.update(
      updateQuestionInput.id,
      updateQuestionInput,
    );
  }

  @Mutation(() => Question)
  removeQuestion(@Args('id', { type: () => Int }) id: number) {
    return this.questionService.remove(id);
  }

  @Mutation(() => Boolean)
  importQuestionCsv(
    @Args('file', { type: () => GraphQLUpload }) file: FileUpload,
  ): Promise<boolean> {
    return this.questionService.importFromCsv(file);
  }

  @Query(() => [Question])
  getRandomQuestion(
    @Args('level', { type: () => EnumLevel }) level: EnumLevel,
    @Args('count', { type: () => Int }) count: number,
  ) {
    return this.questionService.getRandomQuestion(level, count);
  }
}
