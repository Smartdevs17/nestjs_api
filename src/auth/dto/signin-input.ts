import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, Min } from "class-validator";

@InputType()
export class SigninInput{
    @IsNotEmpty()
    @IsString()
    @Field()
    username: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    password: string;
}