import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TrackService } from 'src/track/track.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, TrackService],
  exports: [AlbumService],
})
export class AlbumModule {}
