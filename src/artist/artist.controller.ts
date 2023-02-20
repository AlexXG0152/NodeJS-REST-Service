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
import { ArtistService } from './artist.service';
import { ArtistDto } from './dto/artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get('/')
  async getAllTracks() {
    return this.artistService.getArtists();
  }

  @Get(':id')
  async getOneTrack(@Param('id') id: string) {
    return this.artistService.getArtist(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOneTrack(@Body() artist: ArtistDto) {
    return this.artistService.createArtist(artist);
  }

  @Put(':id')
  async updateOneTrack(@Param('id') id: string, @Body() data: ArtistDto) {
    return this.artistService.updateArtist(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOneTrack(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}
