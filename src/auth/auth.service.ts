import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthDTO } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwt: JwtService,
  ) {}

  async signUp(data: AuthDTO) {
    const { login, password } = data;
    const user = await this.prisma.user.findUnique({ where: { login } });

    if (user) {
      throw new BadRequestException('User alreade exists!');
    }

    const hashedPassword = await this.hashPassword(password);
    data[password] = hashedPassword;
    try {
      await this.userService.createUser(data as CreateUserDto);
      return { message: 'DTO is valid!' };
    } catch (error) {}
  }

  async login(data: AuthDTO, req: Request, res: Response) {
    const { login, password } = data;

    const user = await this.prisma.user.findUnique({ where: { login } });

    if (!user) {
      throw new BadRequestException('Wrong credentials!');
    }

    const isPasswordMatch = await this.comparePasswords({
      password,
      hash: user.password,
    });

    if (!isPasswordMatch) {
      throw new BadRequestException('Wrong credentials!');
    }

    const token = await this.signToken({ id: user.id, login: user.login });

    if (!token) {
      throw new ForbiddenException();
    }

    res.cookie('token', token);

    return res.send({ message: 'Logged in successfully' });
  }

  async signOut() {
    return '';
  }

  async refresh() {
    return '';
  }

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePasswords(args: {
    password: string;
    hash: string;
  }): Promise<boolean> {
    return await bcrypt.compare(args.password, args.hash);
  }

  async signToken(args: { id: string; login: string }) {
    const payload = args;
    return this.jwt.signAsync(payload, { secret: process.env.JWT_SECRET_KEY });
  }
}
