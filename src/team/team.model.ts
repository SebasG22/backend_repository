import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Team {
    @Field(() => ID)
    id: string;
    @Field()
    name: string;
    @Field()
    flag_icon: string;
    @Field()
    background: string;
}