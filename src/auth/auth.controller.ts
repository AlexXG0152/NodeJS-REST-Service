import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() data: AuthDTO) {
    return this.authService.signUp(data);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() data: AuthDTO) {
    return this.authService.login(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('signout')
  @HttpCode(HttpStatus.OK)
  async signout(@Req() req: Request) {
    const user = req.user;
    return this.authService.signOut(user['id']);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request) {
    const user = req.user;
    return this.authService.refresh(user['id'], user['refreshToken']);
  }
}
