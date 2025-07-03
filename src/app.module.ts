import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaService } from './prisma/prisma.service';
import { CategoryModule } from './category/category.module';
import { PrismaModule } from './prisma/prisma.module';
import { VocabularyModule } from './vocabulary/vocabulary.module';
import { GrammarModule } from './grammar/grammar.module';
import { GrammarUsageModule } from './grammar_usage/grammar_usage.module';
import { GrammarExampleModule } from './grammar_example/grammar_example.module';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: process.env.NODE_ENV !== 'production',
      context: ({ req }) => ({
        headers: req.headers,
      }),
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
        numberScalarMode: 'integer',
      },
      csrfPrevention: false,
    }),
    CategoryModule,
    PrismaModule,
    VocabularyModule,
    GrammarModule,
    GrammarUsageModule,
    GrammarExampleModule,
    QuestionModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
