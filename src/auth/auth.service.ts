import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Not, Repository, UpdateResult } from 'typeorm';

import { AuthResponseInterface } from '../shared/interfaces/auth.response.interface';
import { hashService, compareHash } from '../shared/utils/hash.service';
import {
  TokenInterface,
  tokensType,
} from '../shared/interfaces/token.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private authRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  //signup user
  async signUp(data: SignupDto): Promise<AuthResponseInterface<User>> {
    const user = await this.checkUserExist(data.email); // check if user already exist
    if (user) {
      throw new BadRequestException('User already exist');
    }

    const hashedPassword = await hashService(data.password);

    try {
      const newUser = this.authRepository.create({
        ...data,
        password: hashedPassword,
      });
      const createdUser = await this.authRepository.save(newUser);
      const TokenData = {
        id: createdUser.id,
      };
      const tokens: tokensType = await this.signToken(TokenData);
      await this.saveRtHash(TokenData, tokens.refreshToken);
      return {
        message: 'Registration successful',
        tokens: tokens,
        data: createdUser,
      };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async checkUserExist(email): Promise<boolean> {
    const user = await this.authRepository.findOne({ where: { email } });
    return !!user;
  }

  async login(login: LoginDto): Promise<AuthResponseInterface<any>> {
    const user = await this.authRepository.findOne({
      where: { email: login.email },
    });

    if (!user) throw new ForbiddenException('access denied');
    const pwd = await compareHash(login.password, user.password);
    if (!pwd) throw new ForbiddenException('Email or password is incorrect');
    const data = {
      id: user.id,
    };
    const tokens: tokensType = await this.signToken(data);
    /* save token */
    await this.saveRtHash(data, tokens.refreshToken);

    return {
      message: 'login successfully',
      tokens: tokens,
      data: null,
    };
  }

  async logout(id: string): Promise<UpdateResult> {
    return await this.authRepository.update(
      { id: id, refreshToken: Not('null') },
      { refreshToken: null },
    );
  }


  async saveRtHash(data: TokenInterface, rt: string): Promise<any> {
    const hash = await hashService(rt);
    await this.authRepository.update(data.id, { refreshToken: hash });
  }
  async signToken(data: TokenInterface): Promise<any> {

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(data, {
        expiresIn: '1h',
      }),
      this.jwtService.signAsync(data, {
        expiresIn: '7d',
      }),
    ]);
    return {
      accessToken: at,
      refreshToken: rt,
    };
  }
  async refreshToken(
    id: string,
  ): Promise<AuthResponseInterface<any>> {
    const tokens: tokensType = await this.signToken({ id});
    await this.saveRtHash({ id }, tokens.refreshToken);
    return {
      message: 'Refresh token generated successfully',
      tokens: tokens,
      data: null,
    };
  }

}
