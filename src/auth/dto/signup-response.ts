import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/user.entity";

@ObjectType()
export class SignupResponse{
    @Field(() => String, { description: "success message"})
    message: string;

    @Field(() => Boolean, { description: "success status"})
    success: boolean;

}