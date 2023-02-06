export interface IArtist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}
