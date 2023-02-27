import { Global, Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { TrackService } from 'src/track/track.service';
import { LoggerService } from 'src/logger/logger.service';

@Global()
@Module({
  controllers: [ArtistController],
  providers: [ArtistService, TrackService, LoggerService],
  exports: [ArtistService],
  imports: [],
})
export class ArtistModule {}
