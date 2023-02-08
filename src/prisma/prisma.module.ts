import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { Module } from '@nestjs/common';
import { Global } from '@nestjs/common/decorators';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
