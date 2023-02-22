import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/auth/signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() data: AuthDTO) {
    return this.authService.signUp(data);
  }

  @Post('/auth/login')
  async login(@Body() data: AuthDTO, @Req() req, @Res() res) {
    return this.authService.login(data, req, res);
  }

  @Post('/auth/refresh')
  async refresh(@Body() data: AuthDTO) {
    return this.authService.refresh();
  }

  @Post('/auth/signout')
  async signout(@Body() data: AuthDTO) {
    return this.authService.signOut();
  }
}
