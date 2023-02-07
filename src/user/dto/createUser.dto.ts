import { MinLength } from 'class-validator';

export interface ICreateUserDto {
  login: string;
  password: string;
}

export class CreateUserDto implements ICreateUserDto {
  @MinLength(1)
  login: string;
  @MinLength(1)
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
