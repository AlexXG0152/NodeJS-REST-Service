import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { Global } from '@nestjs/common/decorators';
import { LoggerService } from 'src/logger/logger.service';
@Global()
@Module({
  controllers: [TrackController],
  providers: [TrackService, LoggerService],
  exports: [TrackService],
  imports: [],
})
export class TrackModule {}
