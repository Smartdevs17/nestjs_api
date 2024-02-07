import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthResolver', () => {
  let resolver: AuthResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthResolver, AuthService,PrismaService,JwtService],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should call signup method of AuthService', async () => {
    const signupInput = {
      username: 'test@example.com',
      password: 'password',
    };
    const spy = jest.spyOn(resolver, 'signup');
    await resolver.signup(signupInput);
    expect(spy).toHaveBeenCalledWith(signupInput);
  });

  it('should call signin method of AuthService', async () => {
    const signinInput = {
      username: 'test@example.com',
      password: 'password',
    };
    const spy = jest.spyOn(resolver, 'signin');
    await resolver.signin(signinInput);
    expect(spy).toHaveBeenCalledWith(signinInput);
  });

  it('should call findAll method of AuthService', async () => {
    const spy = jest.spyOn(resolver, 'findAll');
    await resolver.findAll();
    expect(spy).toHaveBeenCalled();
  });
});