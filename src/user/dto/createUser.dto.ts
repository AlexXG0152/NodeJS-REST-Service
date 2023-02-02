import { IUser } from '../user.interface';

export interface ICreateUserDto {
  login: string;
  password: string;
}

export class CreateUserDto implements ICreateUserDto, Partial<IUser> {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
