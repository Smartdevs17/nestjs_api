import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { SignupInput } from './dto/signup-input';
import * as bcrypt from 'bcrypt';
import { SigninInput } from './dto/signin-input';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  //register the new user
  async signup(signupInput: SignupInput) {
    const userExist = await this.findUser(signupInput.username);
    //validation check for username exists and length of password
    if (userExist) return { success: false, message: 'User already exists' };
    if(signupInput.password.length < 8) return { success: false, message: 'Password must be at least 8 characters' }

    const hashedPassword = await bcrypt.hash(signupInput.password, 10);
    await this.prisma.user.create({
      data: {
        ...signupInput,
        password: hashedPassword,
      },
    });
    return { success: true, message: 'User created successfully' };
  }

  //authenticate the user and provide accesstoken
  async signin(signinInput: SigninInput) {
    const user = await this.validateUser(
      signinInput.username,
      signinInput.password,
    );
    if (!user) return null;
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload,{secret: `${process.env.ACCESS_TOKEN}`});
    return { accessToken, user };
  }

  //find a user by the username
  async findUser(username: string) {
    return await this.prisma.user.findUnique({ where: { username } });
  }

  //validate the user password
  async validateUser(username: string, password: string) {
    const user = await this.findUser(username);
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;
    return user;
  }
}
