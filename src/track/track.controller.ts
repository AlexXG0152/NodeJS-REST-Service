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
} from '@nestjs/common';

import { TrackService } from './track.service';
import { TrackDto } from './dto/track.dto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get('/')
  async getAllTracks() {
    return this.trackService.getTracks();
  }

  @Get(':id')
  async getOneTrack(@Param('id') id: string) {
    return this.trackService.getTrack(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOneTrack(@Body() track: TrackDto) {
    return this.trackService.createTrack(track);
  }

  @Put(':id')
  async updateOneTrack(@Param('id') id: string, @Body() data: TrackDto) {
    return this.trackService.updateTrack(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOneTrack(@Param('id') id: string) {
    return this.trackService.deleteTrack(id);
  }
}
