import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiProperty({
    deprecated: true,
    description: 'used to singup new user',
  })
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() body: SignupDto): Promise<any> {
    const { data, message } = await this.authService.signUp(body);

    return {
      success: true,
      message,
      data: {
        ...data,
        password: null,
        refreshToken: null,
        accessToken: null,
      },
    };
  }

  @ApiProperty({
    deprecated: true,
    description: 'used to login user',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const { tokens, message } = await this.authService.login(body);
    return {
      success: true,
      message,
      tokens,
    };
  }

  @ApiProperty({
    deprecated: true,
    description: 'used to logout a user',
  })
  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async logout(
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const loggedIn = await this.authService.logout(user.id);
    if (loggedIn) {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      return { success: true, message: 'logout successfully' };
    }
  }
  @ApiProperty({
    deprecated: true,
    description: 'used to request a refresh token',
  })
  @Post('refresh')
  @UseGuards(AuthGuard('refresh'))
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const { tokens, message } = await this.authService.refreshToken(
      user.id,
    );
    return {
      success: true,
      message,
      tokens,
    };
  }
}
