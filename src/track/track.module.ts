import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { Global } from '@nestjs/common/decorators';
@Global()
@Module({
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
  imports: [],
})
export class TrackModule {}
