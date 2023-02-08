import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { IUser } from './user.interface';
import { UpdatePasswordDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { checkUUID, cheskIsExists } from 'src/helpers/checkers';
import { PrismaService } from 'src/prisma/prisma.service';

// const users: IUser[] = [];

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
      return await cheskIsExists(id, this.prisma);
    } catch (error) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
  }

  async createUser(user: CreateUserDto) {
    try {
      // const dbServiceInfo = {
      //   id: uuidv4(),
      //   version: 1,
      //   createdAt: Date.now(),
      //   updatedAt: Date.now(),
      // };

      // const data = { ...user, ...dbServiceInfo };

      return await this.prisma.user.create({ data: user });

      // users.push({ ...user, ...dbServiceInfo });

      // delete user.password;
      // return { ...user, ...dbServiceInfo };
    } catch (error) {}
  }

  async updateUser(id: string, data: UpdatePasswordDto) {
    try {
      await checkUUID(id);
      // await cheskIsExists(id, this.prisma);
      return await this.prisma.user.update({
        where: { id },
        data: {
          password: data.newPassword,
          version: { increment: 1 },
        },
      });
    } catch (error) {}

    // for (const user in users) {
    //   if (Object.prototype.hasOwnProperty.call(users, user)) {
    //     if (users[user].id === id) {
    //       if (users[user].password === data.newPassword) {
    //         throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    //       }
    //       users[user].version += 1;
    //       users[user].password = data.newPassword;
    //       users[user].updatedAt = Date.now();
    //       const { password, ...rest } = users[user];
    //       return rest;
    //     }
    //   }
    // }
  }

  async deleteUser(id: string) {
    try {
      await checkUUID(id);
      return await this.prisma.user.delete({ where: { id } });
    } catch (error) {}

    // const userIndex = users.findIndex((user) => user.id === id);
    // if (userIndex === -1) {
    //   throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    // }

    // if (userIndex > -1) {
    //   users.splice(userIndex, 1);
    // }
    // return HttpStatus.CREATED;
  }
}
