import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../../user/user.entity";

@ObjectType()
export class SigninResponse{
    @Field(() => String, { description: "accessToken"})
    accessToken: string;

    @Field(() => User, { description: "user information"})
    user: User;
}