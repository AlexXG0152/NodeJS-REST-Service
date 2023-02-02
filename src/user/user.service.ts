import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { IUser } from './user.interface';
import { UpdatePasswordDto } from './dto/updateUser.dto';

@Injectable({})
export class UserService {
  private users: IUser[] = [];

  getUsers() {
    return this.users;
  }

  getUser(id: string) {
    return this.users.find((user) => user.id === id);
  }

  createUser(user: IUser) {
    const dbServiceInfo = {
      id: uuidv4(),
      version: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    return this.users.push({ ...user, ...dbServiceInfo });
  }

  updateUser(id: string, data: UpdatePasswordDto) {
    for (const user in this.users) {
      if (Object.prototype.hasOwnProperty.call(this.users, user)) {
        if (this.users[user].id === id) {
          this.users[user].password = data.newPassword;
        }
      }
    }

    return this.users;
  }

  deleteUser(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex > -1) {
      this.users.splice(userIndex, 1);
    }
    return this.users;
  }
}
