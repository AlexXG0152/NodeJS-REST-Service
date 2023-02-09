import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { AlbumDto } from './dto/album.dto';
import { checkUUID, cheskIsExists } from 'src/helpers/checkers';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(
    // @Inject(forwardRef(() => FavoritesService))
    // private favoritesService: FavoritesService,
    // @Inject(forwardRef(() => TrackService))
    // private trackService: TrackService,
    // @Inject(forwardRef(() => PrismaService))
    private prisma: PrismaService,
  ) {}

  async getAlbums() {
    try {
      return await this.prisma.album.findMany();
    } catch (error) {}
  }

  async getAlbum(id: string) {
    await checkUUID(id);
    try {
      return await cheskIsExists(id, this.prisma.album);
    } catch (error) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
  }
  async createAlbum(album: AlbumDto) {
    try {
      return await this.prisma.album.create({ data: album });
    } catch (error) {}
  }

  async updateAlbum(id: string, data: AlbumDto) {
    try {
      await checkUUID(id);
      return await this.prisma.album.update({
        where: { id },
        data: {
          name: data.name,
          year: data.year,
          artistId: data?.artistId,
        },
      });
    } catch (error) {}
  }

  async deleteAlbum(id: string) {
    try {
      await checkUUID(id);
      return await this.prisma.album.delete({ where: { id } });
    } catch (error) {}
  }
}
