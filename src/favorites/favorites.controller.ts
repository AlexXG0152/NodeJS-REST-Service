import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get('/')
  async getAllFavorites() {
    return this.favoritesService.getAllFavoritesCollections();
  }

  @Get('/:id')
  async getOneFavorite(@Param('id') id: string) {
    return this.favoritesService.getOneFavoriteCollection(id);
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  async addOneTrackToFavs(@Param('id') id: string, @Body() favs: string) {
    return this.favoritesService.addToFavorites(id, 'track', favs);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addOneAlbumToFavs(@Param('id') id: string, @Body() favs: string) {
    return this.favoritesService.addToFavorites(id, 'album', favs);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async addOneArtistToFavs(@Param('id') id: string, @Body() favs: string) {
    return this.favoritesService.addToFavorites(id, 'artist', favs);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrackFromFavorites(
    @Param('id') id: string,
    @Body() favs: string,
  ) {
    return this.favoritesService.deleteFromFavorites(id, 'track', favs);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOneAlbumFromFavorites(
    @Param('id') id: string,
    @Body() favs: string,
  ) {
    return this.favoritesService.deleteFromFavorites(id, 'album', favs);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOneArtistFromFavorites(
    @Param('id') id: string,
    @Body() favs: string,
  ) {
    return this.favoritesService.deleteFromFavorites(id, 'artist', favs);
  }
}
