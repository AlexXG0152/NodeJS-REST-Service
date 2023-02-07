import { Global, Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TrackService } from 'src/track/track.service';

@Global()
@Module({
  controllers: [AlbumController],
  providers: [AlbumService, TrackService],
  exports: [AlbumService],
  imports: [],
})
export class AlbumModule {}
