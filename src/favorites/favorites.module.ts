import { Global, Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';

@Global()
@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, AlbumService, ArtistService, TrackService],
  exports: [FavoritesService],
  imports: [],
})
export class FavoriteModule {}
