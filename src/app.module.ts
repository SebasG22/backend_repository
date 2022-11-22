import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerResolver } from './player/player.resolver';
import { PlayerService } from './player/player.service';
import { TeamResolver } from './team/team.resolver';
import { TeamService } from './team/team.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.graphql'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, TeamService, TeamResolver, PlayerService, PlayerResolver],
})
export class AppModule {}
