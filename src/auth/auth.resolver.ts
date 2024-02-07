import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { SignupResponse } from './dto/signup-response';
import { SignupInput } from './dto/signup-input';
import { SigninResponse } from './dto/signin-response';
import { SigninInput } from './dto/signin-input';
import { ForbiddenException } from '@nestjs/common';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}


  @Mutation(() => SignupResponse)
  async signup(@Args('signupInput') signupInput: SignupInput){
    try {
      return await this.authService.signup(signupInput);
    } catch (error) {
      console.error(error);
      throw new Error("an error occurred");
    }    
  }

  @Mutation(() => SigninResponse)
  async signin(@Args('signinInput') signinInput: SigninInput){
      const loggedInUser = await this.authService.signin(signinInput);
      if(!loggedInUser){
        throw new ForbiddenException("Invalid credentials");
      }
      return loggedInUser;
  }

  @Query(() => [Auth], { name: 'auth' })
  findAll() {
    return "this is all users"
  }

}
