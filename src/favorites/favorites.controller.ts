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
    return this.favoritesService.addToFavorites(id, 'tracks');
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  async createOneAlbumFavorites(@Param('id') id: string) {
    return this.favoritesService.addToFavorites(id, 'albums');
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async createOneArtistFavorites(@Param('id') id: string) {
    return this.favoritesService.addToFavorites(id, 'artists');
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrackFavorites(@Param('id') id: string) {
    return this.favoritesService.deleteFromFavorites(id, 'tracks');
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOneAlbumFavorites(@Param('id') id: string) {
    return this.favoritesService.deleteFromFavorites(id, 'albums');
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOneArtistFavorites(@Param('id') id: string) {
    return this.favoritesService.deleteFromFavorites(id, 'artists');
  }
}
