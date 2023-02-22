import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export interface ICreateUserDto {
  login: string;
  password: string;
  createdAt?: number;
  updatedAt?: number;
}

export class CreateUserDto implements ICreateUserDto {
  @IsNotEmpty()
  @IsString()
  login: string;
  @IsNotEmpty()
  @IsString()
  password: string;

  createdAt?: number;
  updatedAt?: number;
}
