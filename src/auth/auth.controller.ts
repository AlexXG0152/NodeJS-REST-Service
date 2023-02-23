import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { Request } from 'express';
import { AtGuard, RtGuard } from './common/guards';
import { Public } from './common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() data: AuthDTO) {
    return this.authService.signUp(data);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() data: AuthDTO) {
    return this.authService.login(data);
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  async signout(@Req() req: Request) {
    const user = req.user;
    return this.authService.signOut(user['id']);
    // async signout(@GetCurrentUser('id') id: string) {
    //   return this.authService.signOut(id);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request) {
    const user = req.user;
    return this.authService.refresh(user['id'], user['refreshToken']);
  }
}
