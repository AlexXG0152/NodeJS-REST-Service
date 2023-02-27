import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { FavoritesService } from './favorites.service';
import { LoggerService } from 'src/logger/logger.service';

@Controller('favs')
export class FavoritesController {
  constructor(
    private favoritesService: FavoritesService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.setContext('FavoritesController');
  }

  @Get('/')
  async getAllFavorites(@Req() req: Request, @Res() res: Response) {
    try {
      await this.loggerService.loggerGetDelete(req, res);
      return res.send(await this.favoritesService.getAllFavoritesCollections());
    } catch (error) {
      await this.loggerService.loggerError(req, res, error);
      return res.status(error.status).send(error);
    }
  }

  @Get('/:id')
  async getOneFavorite(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.loggerService.loggerGetDelete(req, res);
      return res.send(await this.favoritesService.getAllFavoritesCollections());
    } catch (error) {
      await this.loggerService.loggerError(req, res, error);
      return res.status(error.status).send(error);
    }
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  async addOneTrackToFavs(
    @Param('id') id: string,
    @Body() favs: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.loggerService.loggerGetDelete(req, res);
      return res.send(
        await this.favoritesService.addToFavorites(id, 'track', favs),
      );
    } catch (error) {
      await this.loggerService.loggerError(req, res, error);
      return res.status(error.status).send(error);
    }
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addOneAlbumToFavs(
    @Param('id') id: string,
    @Body() favs: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.loggerService.loggerGetDelete(req, res);
      return res.send(
        await this.favoritesService.addToFavorites(id, 'album', favs),
      );
    } catch (error) {
      await this.loggerService.loggerError(req, res, error);
      return res.status(error.status).send(error);
    }
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async addOneArtistToFavs(
    @Param('id') id: string,
    @Body() favs: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.loggerService.loggerGetDelete(req, res);
      return res.send(
        await this.favoritesService.addToFavorites(id, 'artist', favs),
      );
    } catch (error) {
      await this.loggerService.loggerError(req, res, error);
      return res.status(error.status).send(error);
    }
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrackFromFavorites(
    @Param('id') id: string,
    @Body() favs: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.loggerService.loggerGetDelete(req, res);
      return res.send(
        await this.favoritesService.deleteFromFavorites(id, 'track', favs),
      );
    } catch (error) {
      await this.loggerService.loggerError(req, res, error);
      return res.status(error.status).send(error);
    }
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOneAlbumFromFavorites(
    @Param('id') id: string,
    @Body() favs: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.loggerService.loggerGetDelete(req, res);
      return res.send(
        await this.favoritesService.deleteFromFavorites(id, 'album', favs),
      );
    } catch (error) {
      await this.loggerService.loggerError(req, res, error);
      return res.status(error.status).send(error);
    }
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOneArtistFromFavorites(
    @Param('id') id: string,
    @Body() favs: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.loggerService.loggerGetDelete(req, res);
      return res.send(
        await this.favoritesService.deleteFromFavorites(id, 'artist', favs),
      );
    } catch (error) {
      await this.loggerService.loggerError(req, res, error);
      return res.status(error.status).send(error);
    }
  }
}
