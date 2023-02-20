import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { checkUUID } from 'src/helpers/checkers';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async getAllFavoritesCollections(): Promise<any> {
    try {
      const favs = await this.prisma.favorite.findMany();
      return favs[0];
    } catch (error) {
      console.log(error);
    }
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
        default:
          const wrongID = await this.prisma.favorite.findUnique({
            where: { id },
          });
          if (wrongID === null) {
            throw new HttpException(
              'UNPROCESSABLE_ENTITY',
              HttpStatus.UNPROCESSABLE_ENTITY,
            );
          }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteFromFavorites(id: string, section: string, fav: any) {
    await checkUUID(id);
    const favRecord = await this.getAllFavoritesCollections();
    try {
      switch (section) {
        case 'artist':
          const deleteArtist = await this.prisma.favorite.update({
            where: { id: favRecord.id },
            data: { artists: [] },
          });
          return deleteArtist;

        case 'album':
          const deleteAlbum = await this.prisma.favorite.update({
            where: { id: favRecord.id },
            data: { albums: [] },
          });
          return deleteAlbum;

        case 'track':
          const deleteTrack = await this.prisma.favorite.update({
            where: { id: favRecord.id },
            data: { tracks: [] },
          });
          return deleteTrack;

        default:
          const unknownSection = section;
          throw new Error(`Unknown section ${unknownSection}`);
      }
    } catch (error) {}
  }
}
