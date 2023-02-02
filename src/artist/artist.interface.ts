export interface IArtist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}