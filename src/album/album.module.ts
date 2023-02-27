import { Global, Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TrackService } from 'src/track/track.service';
import { LoggerService } from 'src/logger/logger.service';

@Global()
@Module({
  controllers: [AlbumController],
  providers: [AlbumService, TrackService, LoggerService],
  exports: [AlbumService],
  imports: [],
})
export class AlbumModule {}
