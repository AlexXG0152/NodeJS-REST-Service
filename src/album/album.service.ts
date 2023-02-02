import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';

import { AlbumDto } from './dto/album.dto';
import { IAlbum } from './album.interface';
import { TrackService } from 'src/track/track.service';
import { checkUUID, cheskIsExists } from 'src/helpers/checkers';

const albums: IAlbum[] = [];

@Injectable()
export class AlbumService {
  constructor(private trackService: TrackService) {}

  async getAlbums() {
    return albums;
  }

  async getAlbum(id: string) {
    await checkUUID(id);

    try {
      return await cheskIsExists(id, albums);
    } catch (error) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
  }
  async createAlbum(album: AlbumDto) {
    try {
      const dbServiceInfo = {
        id: uuidv4(),
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      albums.push({ ...album, ...dbServiceInfo });

      return { ...album, ...dbServiceInfo };
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
          albums[album].version += 1;
          albums[album].updatedAt = Date.now();

          return albums[album];
        }
      }
    }
  }

  async deleteAlbum(id: string) {
    await checkUUID(id);

    await this.trackService.updateManyTracksAfterDelete(id, 'album');

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
