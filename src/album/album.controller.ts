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
import { AlbumService } from './album.service';
import { AlbumDto } from './dto/album.dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get('/')
  async getAllAlbums() {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  async getOneAlbum(@Param('id') id: string) {
    return this.albumService.getAlbum(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOneAlbum(@Body() album: AlbumDto) {
    return this.albumService.createAlbum(album);
  }

  @Put(':id')
  async updateOneAlbum(@Param('id') id: string, @Body() data: AlbumDto) {
    return this.albumService.updateAlbum(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOneAlbum(@Param('id') id: string) {
    return this.albumService.deleteAlbum(id);
  }
}
