import {
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
    return this.favoritesService.getAllFavorites();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  async createOneTrackFavorites(@Param('id') id: string) {
    return this.favoritesService.addToToFavorites(id, 'track');
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  async createOneAlbumFavorites(@Param('id') id: string) {
    return this.favoritesService.addToToFavorites(id, 'album');
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async createOneArtistFavorites(@Param('id') id: string) {
    return this.favoritesService.addToToFavorites(id, 'artist');
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrackFavorites(@Param('id') id: string) {
    return this.favoritesService.deleteFavorites(id, 'track');
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOneAlbumFavorites(@Param('id') id: string) {
    return this.favoritesService.deleteFavorites(id, 'album');
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOneArtistFavorites(@Param('id') id: string) {
    return this.favoritesService.deleteFavorites(id, 'artist');
  }
}
