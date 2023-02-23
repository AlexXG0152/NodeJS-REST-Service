import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';
import { Public } from './auth/common/decorators';

@Controller()
export class AppController implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    await this.prisma.favorite.create({
      data: {
        artists: [] as Prisma.JsonArray,
        albums: [] as Prisma.JsonArray,
        tracks: [] as Prisma.JsonArray,
      },
    });
  }

  @Public()
  @Get('/')
  async getAllUsers() {
    return '';
  }
}
