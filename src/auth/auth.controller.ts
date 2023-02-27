import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { Request, Response } from 'express';
import { AtGuard, RtGuard } from './common/guards';
import { Public } from './common/decorators';
import { LoggerService } from 'src/logger/logger.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.setContext('AuthController');
  }

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(
    @Body() data: AuthDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.loggerService.loggerGetDelete(req, res);
      return res.send(await this.authService.signUp(data));
    } catch (error) {
      await this.loggerService.loggerError(req, res, error);
      return res.status(error.status).send(error);
    }
    // return this.authService.signUp(data);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() data: AuthDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.loggerService.loggerGetDelete(req, res);
      return res.send(await this.authService.login(data));
    } catch (error) {
      await this.loggerService.loggerError(req, res, error);
      return res.status(error.status).send(error);
    }
    // return this.authService.login(data);
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  async signout(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req.user;
      await this.loggerService.loggerGetDelete(req, res);
      return res.send(await this.authService.signOut(user['id']));
    } catch (error) {
      await this.loggerService.loggerError(req, res, error);
      return res.status(error.status).send(error);
    }
    // const user = req.user;
    // return this.authService.signOut(user['id']);
    // async signout(@GetCurrentUser('id') id: string) {
    //   return this.authService.signOut(id);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req.user;
      await this.loggerService.loggerGetDelete(req, res);
      return res.send(
        await this.authService.refresh(user['id'], user['refreshToken']),
      );
    } catch (error) {
      await this.loggerService.loggerError(req, res, error);
      return res.status(error.status).send(error);
    }
    // const user = req.user;
    // return this.authService.refresh(user['id'], user['refreshToken']);
  }
}
