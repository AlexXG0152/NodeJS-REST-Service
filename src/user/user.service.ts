import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UpdatePasswordDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { checkUUID, cheskIsExists } from 'src/helpers/checkers';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable({})
export class UserService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

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
      const hashedPassword = await this.authService.hashPassword(data.password);
      const user = await this.prisma.user.create({
        data: {
          login: data.login,
          password: hashedPassword,
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

    const isPasswordMatch = await bcrypt.compare(
      oldData.password,
      await bcrypt.hash(data.newPassword, Number(process.env.CRYPT_SALT)),
    );

    if (isPasswordMatch) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }

    const hashedPassword = await this.authService.hashPassword(
      data.newPassword,
    );

    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: {
          password: hashedPassword,
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
