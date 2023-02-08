import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { AlbumDto } from './dto/album.dto';
import { IAlbum } from './album.interface';
import { TrackService } from 'src/track/track.service';
import { checkUUID, cheskIsExists } from 'src/helpers/checkers';
import { FavoritesService } from 'src/favorites/favorites.service';
import { PrismaService } from 'src/prisma/prisma.service';

const albums: IAlbum[] = [];

@Injectable()
export class AlbumService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
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
      return await cheskIsExists(id, this.prisma);
    } catch (error) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
  }
  async createAlbum(album: AlbumDto) {
    try {
      // const dbServiceInfo = {
      //   id: uuidv4(),
      //   version: 1,
      //   createdAt: Date.now(),
      //   updatedAt: Date.now(),
      // };

      // albums.push({ ...album, ...dbServiceInfo });

      // return { ...album, ...dbServiceInfo };
      return await this.prisma.album.create({ data: album });
    } catch (error) {}
  }

  async updateAlbum(id: string, data: AlbumDto) {
    await checkUUID(id);

    await cheskIsExists(id, albums);

    for (const album in albums) {
      if (Object.prototype.hasOwnProperty.call(albums, album)) {
        if (albums[album].id === id) {
          albums[album].name = data.name;
          albums[album].year = data.year;
          albums[album].artistId = data.artistId;
          albums[album].updatedAt = Date.now();

          return albums[album];
        }
      }
    }
  }

  async deleteAlbum(id: string) {
    await checkUUID(id);

    try {
      await this.trackService.updateManyTracksAfterDelete(id, 'album');
      await this.favoritesService.deleteFromFavorites(id, 'albums');
    } catch (error) {}

    const albumIndex = albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    if (albumIndex > -1) {
      albums.splice(albumIndex, 1);
    }
    return 'HttpStatus.NO_CONTENT';
  }
}
