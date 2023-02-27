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

import { TrackService } from './track.service';
import { TrackDto } from './dto/track.dto';
import { LoggerService } from 'src/logger/logger.service';

@Controller('track')
export class TrackController {
  constructor(
    private trackService: TrackService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.setContext('TrackController');
  }

  @Get('/')
  async getAllTracks(@Req() req: Request, @Res() res: Response) {
    try {
      await this.loggerService.loggerGetDelete(req, res);
      return res.send(await this.trackService.getTracks());
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
      return res.send(await this.trackService.getTrack(id));
    } catch (error) {
      await this.loggerService.loggerError(req, res, error);
      return res.status(error.status).send(error);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOneTrack(
    @Body() track: TrackDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.loggerService.loggerPostPut(req, res);
      return res.send(await this.trackService.createTrack(track));
    } catch (error) {
      await this.loggerService.loggerError(req, res, error);
      return res.status(error.status).send(error);
    }
  }

  @Put(':id')
  async updateOneTrack(
    @Param('id') id: string,
    @Body() data: TrackDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.loggerService.loggerPostPut(req, res);
      return res.send(await this.trackService.updateTrack(id, data));
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
      return res.send(await this.trackService.deleteTrack(id));
    } catch (error) {
      await this.loggerService.loggerError(req, res, error);
      return res.status(error.status).send(error);
    }
  }
}
