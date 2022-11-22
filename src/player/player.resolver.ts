import { Args, Float, ID, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { TeamService } from "src/team/team.service";
import { Player, PlayerFoot, PlayerPosition } from "./player.model";
import { PlayerService } from "./player.service";

@Resolver(() => Player)
export class PlayerResolver {
    constructor(private playerService: PlayerService, private teamService: TeamService) {
    }

    @Query(() => [Player])
    getAllPlayers() {
        return this.playerService.getPlayers();
    }

    @Query(() => [Player])
    getAllPlayersByTeam(@Args("teamId", {type: () => ID}) teamId: string) {
        return this.playerService.getPlayersByTeam(teamId);
    }

    @Query(() => [Player])
    getAllPlayersByTeamWithParameters(
        @Args("teamId", {type: () => ID}) teamId: string,
        @Args("foot", {type: () => PlayerFoot}) foot?: PlayerFoot,
        @Args("positions", {type: () => PlayerPosition}) positions?: PlayerPosition[]
    ) {
        return this.playerService.getAllPlayersByTeamWithParameters(teamId, foot, positions);
    }

    @ResolveField()
    team(@Parent() player: Player) {
        const { teamId } = player;
        return this.teamService.getTeamById(teamId);
    }

    @Mutation(() => Player)
    createPlayer(
        @Args("name") name: string,
        @Args("teamId", {type: () => ID}) teamId: string,
        @Args("position", {type: () => PlayerPosition}) position: PlayerPosition[],
        @Args("birth") birth: string,
        @Args("height", {type: () => Float}) height: number,
        @Args("weight", {type: () => Float}) weight: number,
        @Args("foot", {type: () => PlayerFoot}) foot: PlayerFoot
    ): Player {
        return this.playerService.createPlayer(name, teamId, position, birth, height, weight, foot);
    }
}