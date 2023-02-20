import { Global, Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { TrackService } from 'src/track/track.service';

@Global()
@Module({
  controllers: [ArtistController],
  providers: [ArtistService, TrackService],
  exports: [ArtistService],
  imports: [],
})
export class ArtistModule {}
