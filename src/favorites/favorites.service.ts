import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { checkUUID } from 'src/helpers/checkers';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class FavoritesService {
  constructor(
    // @Inject(forwardRef(() => ArtistService))
    // private artistService: ArtistService,
    // @Inject(forwardRef(() => AlbumService))
    // private albumService: AlbumService,
    // @Inject(forwardRef(() => TrackService))
    // private trackService: TrackService,
    private prisma: PrismaService,
  ) {}

  async getAllFavoritesCollections(): Promise<any> {
    try {
      const favs = await this.prisma.favorite.findMany();
      return favs[0];
    } catch (error) {
      console.log(error);
    }
  }

  async getOneFavoriteCollection(id: string) {
    await checkUUID(id);
    //   try {
    //     const favs = await this.prisma.favorite.findUnique({
    //       where: { id },
    //       include: { artists: true, albums: true, tracks: true },
    //     });
    //     console.log(favs);
    //   } catch (error) {
    //     console.log(error);
    //   }
  }

  async createFavoritesCollection(id: string) {
    await checkUUID(id);
    //   try {
    //     return await this.prisma.favorite.create({
    //       data: {},
    //       include: { artists: true, albums: true, tracks: true },
    //     });
    //   } catch (error) {
    //     throw new HttpException(
    //       'UNPROCESSABLE_ENTITY',
    //       HttpStatus.UNPROCESSABLE_ENTITY,
    //     );
    //   }
  }

  async addToFavorites(id: string, section: string, fav: any) {
    await checkUUID(id);
    const favRecord = await this.getAllFavoritesCollections();
    try {
      switch (section) {
        case 'artist':
          const artistFav = await this.prisma.artist.findUnique({
            where: { id },
          });
          delete artistFav.createdAt;
          delete artistFav.updatedAt;

          const updateArtist = await this.prisma.favorite.update({
            where: { id: favRecord.id },
            data: {
              artists: [...favRecord.artists.splice(0), artistFav],
            },
          });
          return updateArtist[0];

        case 'album':
          const albumFav = await this.prisma.album.findUnique({
            where: { id },
          });
          delete albumFav.createdAt;
          delete albumFav.updatedAt;

          const updateAlbum = await this.prisma.favorite.update({
            where: { id: favRecord.id },
            data: {
              albums: [...favRecord.albums.splice(0), albumFav],
            },
          });
          return updateAlbum[0];
        //   return await this.prisma.favorite.update({
        //     where: { id },
        //     data: { albums: fav.id },
        //     // include: { albums: true },
        // });

        case 'track':
          const trackFav = await this.prisma.track.findUnique({
            where: { id },
          });
          delete trackFav.createdAt;
          delete trackFav.updatedAt;

          const updateTrack = await this.prisma.favorite.update({
            where: { id: favRecord.id },
            data: {
              tracks: [...favRecord.tracks.splice(0), trackFav],
            },
          });
          return updateTrack[0];
        //   return await this.prisma.favorite.update({
        //     where: { id },
        //     data: { tracks: fav.id },
        //     // include: { tracks: true },
        //   });

        default:
          const unknownSection = section;
          throw new Error(`Unknown section ${unknownSection}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteFromFavorites(id: string, section: string, fav: any) {
    await checkUUID(id);
    //   try {
    //     switch (section) {
    //       case 'artist':
    //         return await this.prisma.favorite.update({
    //           where: { id },
    //           data: {
    //             artists: {
    //               disconnect: { id: fav.id },
    //             },
    //           },
    //           include: { artists: true },
    //         });

    //       case 'album':
    //         return await this.prisma.favorite.update({
    //           where: { id },
    //           data: {
    //             albums: {
    //               disconnect: { id: fav.id },
    //             },
    //           },
    //           include: { albums: true },
    //         });

    //       case 'track':
    //         return await this.prisma.favorite.update({
    //           where: { id },
    //           data: {
    //             tracks: {
    //               disconnect: { id: fav.id },
    //             },
    //           },
    //           include: { tracks: true },
    //         });

    //       default:
    //         const unknownSection = section;
    //         throw new Error(`Unknown section ${unknownSection}`);
    //     }
    //   } catch (error) {}
  }
}
