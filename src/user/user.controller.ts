import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updateUser.dto';
import { LoggerService } from 'src/logger/logger.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.setContext('UserController');
  }

  @Get('/')
  async getAllUsers(@Req() req: Request, @Res() res: Response) {
    // this.loggerService.warn('About to return cats!');
    await this.loggerService.loggerGetDelete(req, res);
    return res.send(await this.userService.getUsers());
  }

  @Get(':id')
  async getOneUser(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.loggerService.loggerGetDelete(req, res);
      return res.send(await this.userService.getUser(id));
    } catch (error) {
      await this.loggerService.loggerError(req, res, error);
      return res.send(error);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOneUser(
    @Body() user: CreateUserDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.loggerService.loggerPostPut(req, res);
    return res.send(await this.userService.createUser(user));
  }

  @Put(':id')
  async updateOneUser(
    @Param('id') id: string,
    @Body() data: UpdatePasswordDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.loggerService.loggerPostPut(req, res);
    return res.send(await this.userService.updateUser(id, data));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOneUser(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.loggerService.loggerGetDelete(req, res);
    return res.send(await this.userService.deleteUser(id));
  }
}
