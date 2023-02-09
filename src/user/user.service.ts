import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UpdatePasswordDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { checkUUID, cheskIsExists } from 'src/helpers/checkers';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {}
  }

  async getUser(id: string) {
    await checkUUID(id);
    try {
      return await cheskIsExists(id, this.prisma.user);
    } catch (error) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
  }

  async createUser(user: CreateUserDto) {
    try {
      return await this.prisma.user.create({ data: user });
    } catch (error) {}
  }

  async updateUser(id: string, data: UpdatePasswordDto) {
    try {
      await checkUUID(id);
      return await this.prisma.user.update({
        where: { id },
        data: {
          password: data.newPassword,
          version: { increment: 1 },
        },
      });
    } catch (error) {}
  }

  async deleteUser(id: string) {
    try {
      await checkUUID(id);
      return await this.prisma.user.delete({ where: { id } });
    } catch (error) {}
  }
}
