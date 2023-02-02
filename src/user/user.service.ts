import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';

import { IUser } from './user.interface';
import { UpdatePasswordDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { checkUUID, cheskIsExists } from 'src/helpers/checkers';

@Injectable({})
export class UserService {
  private users: IUser[] = [];

  async getUsers() {
    return this.users;
  }

  async getUser(id: string) {
    await checkUUID(id);

    try {
      return await cheskIsExists(id, this.users);
    } catch (error) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
  }

  async createUser(user: CreateUserDto) {
    try {
      const dbServiceInfo = {
        id: uuidv4(),
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      this.users.push({ ...user, ...dbServiceInfo });

      delete user.password;
      return { ...user, ...dbServiceInfo };
    } catch (error) {}
  }

  async updateUser(id: string, data: UpdatePasswordDto) {
    await checkUUID(id);

    await cheskIsExists(id, this.users);

    for (const user in this.users) {
      if (Object.prototype.hasOwnProperty.call(this.users, user)) {
        if (this.users[user].id === id) {
          if (this.users[user].password === data.newPassword) {
            throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
          }
          this.users[user].version += 1;
          this.users[user].password = data.newPassword;
          this.users[user].updatedAt = Date.now();
          const { password, ...rest } = this.users[user];
          return rest;
        }
      }
    }
  }

  async deleteUser(id: string) {
    await checkUUID(id);

    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    if (userIndex > -1) {
      this.users.splice(userIndex, 1);
    }
    return HttpStatus.CREATED;
  }
}
