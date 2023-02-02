import {
  Body,
  Controller,
  Delete,
  Get,
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
  getAllUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getOneUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Post()
  createOneUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Put(':id')
  updateOneUser(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.userService.updateUser(id, updatePasswordDto);
  }

  @Delete(':id')
  deleteOneUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
