-- CreateTable
CREATE TABLE "Album" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "artistId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "grammy" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "artistId" TEXT,
    "albumId" TEXT,
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 0,
    "createdAt" INTEGER NOT NULL,
    "updatedAt" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- -- CreateTable
-- CREATE TABLE "Favorite" (
--     "id" UUID NOT NULL,

--     CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
-- );

-- -- CreateTable
-- CREATE TABLE "_AlbumToFavorite" (
--     "A" UUID NOT NULL,
--     "B" UUID NOT NULL
-- );

-- -- CreateTable
-- CREATE TABLE "_ArtistToFavorite" (
--     "A" UUID NOT NULL,
--     "B" UUID NOT NULL
-- );

-- -- CreateTable
-- CREATE TABLE "_FavoriteToTrack" (
--     "A" UUID NOT NULL,
--     "B" UUID NOT NULL
-- );

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- -- CreateIndex
-- CREATE UNIQUE INDEX "_AlbumToFavorite_AB_unique" ON "_AlbumToFavorite"("A", "B");

-- -- CreateIndex
-- CREATE INDEX "_AlbumToFavorite_B_index" ON "_AlbumToFavorite"("B");

-- -- CreateIndex
-- CREATE UNIQUE INDEX "_ArtistToFavorite_AB_unique" ON "_ArtistToFavorite"("A", "B");

-- -- CreateIndex
-- CREATE INDEX "_ArtistToFavorite_B_index" ON "_ArtistToFavorite"("B");

-- -- CreateIndex
-- CREATE UNIQUE INDEX "_FavoriteToTrack_AB_unique" ON "_FavoriteToTrack"("A", "B");

-- -- CreateIndex
-- CREATE INDEX "_FavoriteToTrack_B_index" ON "_FavoriteToTrack"("B");

-- -- AddForeignKey
-- ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE "Track" ADD CONSTRAINT "Track_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- -- AddForeignKey
-- ALTER TABLE "_AlbumToFavorite" ADD CONSTRAINT "_AlbumToFavorite_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE "_AlbumToFavorite" ADD CONSTRAINT "_AlbumToFavorite_B_fkey" FOREIGN KEY ("B") REFERENCES "Favorite"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE "_ArtistToFavorite" ADD CONSTRAINT "_ArtistToFavorite_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE "_ArtistToFavorite" ADD CONSTRAINT "_ArtistToFavorite_B_fkey" FOREIGN KEY ("B") REFERENCES "Favorite"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE "_FavoriteToTrack" ADD CONSTRAINT "_FavoriteToTrack_A_fkey" FOREIGN KEY ("A") REFERENCES "Favorite"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE "_FavoriteToTrack" ADD CONSTRAINT "_FavoriteToTrack_B_fkey" FOREIGN KEY ("B") REFERENCES "Track"("id") ON DELETE SET NULL ON UPDATE CASCADE;
