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
    await cheskIsExists(id, this.prisma.user);
    try {
      const user = await cheskIsExists(id, this.prisma.user);
      delete user.password;
      return user;
    } catch (error) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
  }

  async createUser(data: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          login: data.login,
          password: data.password,
          createdAt: Math.floor(Date.now() / 1000),
          updatedAt: Math.floor(Date.now() / 1000),
        },
      });
      delete user.password;
      return user;
    } catch (error) {}
  }

  async updateUser(id: string, data: UpdatePasswordDto) {
    await checkUUID(id);

    const oldData = await cheskIsExists(id, this.prisma.user);
    if (oldData.password === data.newPassword) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }

    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: {
          password: data.newPassword,
          version: { increment: 1 },
          updatedAt: Math.floor(Date.now() / 1010),
        },
      });
      delete user.password;
      return user;
    } catch (error) {}
  }

  async deleteUser(id: string) {
    await checkUUID(id);
    await cheskIsExists(id, this.prisma.user);
    try {
      return await this.prisma.user.delete({ where: { id } });
    } catch (error) {}
  }
}
