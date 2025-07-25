import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ConversationService } from './conversation.service';
import { CreateConversationInput } from './dto/create-conversation.input';
import { UpdateConversationInput } from './dto/update-conversation.input';
import { CreateConversationJsonInput } from './dto/create-conversation-json.input';
import { Conversation } from 'src/models/convervation.model';

@Resolver(() => Conversation)
export class ConversationResolver {
  constructor(private readonly conversationService: ConversationService) { }

  @Mutation(() => Conversation)
  createConversation(
    @Args('createConversationInput')
    createConversationInput: CreateConversationInput,
  ) {
    return this.conversationService.create(createConversationInput);
  }

  @Query(() => [Conversation], { name: 'conversations' })
  findAll() {
    return this.conversationService.findAll();
  }

  

  @Query(() => [Conversation], { name: 'conversations' })
  async findAllPaginated(
    @Args('search', { type: () => String, nullable: true }) search?: string,
    @Args('sort', { type: () => String, nullable: true }) sort?: string, // 'asc' | 'desc'
    @Args('page', { type: () => Int, nullable: true }) page = 1,
    @Args('pageSize', { type: () => Int, nullable: true }) pageSize = 10,
  ) {
    return this.conversationService.findAllPaginated({
      search,
      sort,
      page,
      pageSize,
    });
  }
  

  @Query(() => Conversation, { name: 'conversation' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.conversationService.findOne(id);
  }

  @Mutation(() => Conversation)
  updateConversation(
    @Args('updateConversationInput')
    updateConversationInput: UpdateConversationInput,
  ) {
    return this.conversationService.update(
      updateConversationInput.id,
      updateConversationInput,
    );
  }

  @Mutation(() => Conversation)
  removeConversation(@Args('id', { type: () => Int }) id: number) {
    return this.conversationService.remove(id);
  }

  @Mutation(() => Boolean)
  async createConversationJson(
    @Args('input') input: CreateConversationJsonInput,
  ): Promise<boolean> {
    return this.conversationService.createJson(input.input);
  }
}
