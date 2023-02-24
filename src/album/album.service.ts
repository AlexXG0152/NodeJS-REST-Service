import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { AlbumDto } from './dto/album.dto';
import { checkUUID, cheskIsExists } from 'src/common/helpers/checkers';
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

  async updateAlbum(id: string, album: AlbumDto) {
    await checkUUID(id);
    await cheskIsExists(id, this.prisma.album);
    try {
      return await this.prisma.album.update({
        where: { id },
        data: {
          name: album.name,
          year: album.year,
          artistId: album?.artistId,
        },
      });
    } catch (error) {}
  }

  async deleteAlbum(id: string) {
    await checkUUID(id);

    const albumData = await cheskIsExists(id, this.prisma.album);

    try {
      await this.prisma.album.delete({ where: { id } });
      await this.prisma.track.updateMany({
        where: { albumId: albumData.id },
        data: {
          albumId: null,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
