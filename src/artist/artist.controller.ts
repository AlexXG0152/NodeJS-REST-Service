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

import { ArtistService } from './artist.service';
import { ArtistDto } from './dto/artist.dto';
import { LoggerService } from 'src/logger/logger.service';

@Controller('artist')
export class ArtistController {
  constructor(
    private artistService: ArtistService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.setContext('ArtistController');
  }

  @Get('/')
  async getAllTracks(@Req() req: Request, @Res() res: Response) {
    try {
      await this.loggerService.loggerGetDelete(req, res);
      return res.send(await this.artistService.getArtists());
    } catch (error) {
      await this.loggerService.loggerError(req, res, error);
      return res.status(error.status).send(error);
    }
  }

  @Get(':id')
  async getOneTrack(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.loggerService.loggerGetDelete(req, res);
      return res.send(await this.artistService.getArtist(id));
    } catch (error) {
      await this.loggerService.loggerError(req, res, error);
      return res.status(error.status).send(error);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOneTrack(
    @Body() artist: ArtistDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.loggerService.loggerPostPut(req, res);
      return res.send(await this.artistService.createArtist(artist));
    } catch (error) {
      await this.loggerService.loggerError(req, res, error);
      return res.status(error.status).send(error);
    }
  }

  @Put(':id')
  async updateOneTrack(
    @Param('id') id: string,
    @Body() data: ArtistDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.loggerService.loggerPostPut(req, res);
      return res.send(await this.artistService.updateArtist(id, data));
    } catch (error) {
      await this.loggerService.loggerError(req, res, error);
      return res.status(error.status).send(error);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOneTrack(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.loggerService.loggerGetDelete(req, res);
      return res.send(await this.artistService.deleteArtist(id));
    } catch (error) {
      await this.loggerService.loggerError(req, res, error);
      return res.status(error.status).send(error);
    }
  }
}
