import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ConversationService } from './conversation.service';
import { CreateConversationInput } from './dto/create-conversation.input';
import { UpdateConversationInput } from './dto/update-conversation.input';
import { Conversation } from 'src/models/conversation.model';
import { CreateConversationJsonInput } from './dto/create-conversation-json.input';

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
    return this.conversationService.createJson(input.data);
  }
}
