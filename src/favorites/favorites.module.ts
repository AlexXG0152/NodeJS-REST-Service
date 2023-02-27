import { Global, Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { LoggerService } from 'src/logger/logger.service';

@Global()
@Module({
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    AlbumService,
    ArtistService,
    TrackService,
    LoggerService,
  ],
  exports: [FavoritesService],
  imports: [],
})
export class FavoriteModule {}
