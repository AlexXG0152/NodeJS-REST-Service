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
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updateUser.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  async getAllUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getOneUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOneUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Put(':id')
  async updateOneUser(
    @Param('id') id: string,
    @Body() data: UpdatePasswordDto,
  ) {
    return this.userService.updateUser(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOneUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
