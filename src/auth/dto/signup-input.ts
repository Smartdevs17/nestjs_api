import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class SignupInput{
    @IsNotEmpty()
    @IsString()
    @Field()
    username: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    password: string;
}