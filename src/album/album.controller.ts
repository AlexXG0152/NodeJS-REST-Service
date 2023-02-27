import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AlbumService } from './album.service';
import { AlbumDto } from './dto/album.dto';
import { LoggerService } from 'src/logger/logger.service';

@Controller('album')
export class AlbumController {
  constructor(
    private albumService: AlbumService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.setContext('AlbumController');
  }

  @Get('/')
  async getAllAlbums(@Req() req: Request, @Res() res: Response) {
    try {
      await this.loggerService.loggerGetDelete(req, res);
      return res.send(await this.albumService.getAlbums());
    } catch (error) {
      await this.loggerService.loggerError(req, res, error);
      return res.status(error.status).send(error);
    }
  }

  @Get(':id')
  async getOneAlbum(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.loggerService.loggerGetDelete(req, res);
      return res.send(await this.albumService.getAlbum(id));
    } catch (error) {
      await this.loggerService.loggerError(req, res, error);
      return res.status(error.status).send(error);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOneAlbum(
    @Body() album: AlbumDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.loggerService.loggerPostPut(req, res);
      return res.send(await this.albumService.createAlbum(album));
    } catch (error) {
      await this.loggerService.loggerError(req, res, error);
      return res.status(error.status).send(error);
    }
  }

  @Put(':id')
  async updateOneAlbum(
    @Param('id') id: string,
    @Body() data: AlbumDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.loggerService.loggerPostPut(req, res);
      return res.send(await this.albumService.updateAlbum(id, data));
    } catch (error) {
      await this.loggerService.loggerError(req, res, error);
      return res.status(error.status).send(error);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOneAlbum(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.loggerService.loggerGetDelete(req, res);
      return res.send(await this.albumService.deleteAlbum(id));
    } catch (error) {
      await this.loggerService.loggerError(req, res, error);
      return res.status(error.status).send(error);
    }
  }
}
