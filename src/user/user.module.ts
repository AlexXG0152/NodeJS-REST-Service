import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from 'src/logger/logger.service';

@Module({
  controllers: [UserController],
  providers: [UserService, AuthService, JwtService, LoggerService],
  exports: [UserService],
})
export class UserModule {}
