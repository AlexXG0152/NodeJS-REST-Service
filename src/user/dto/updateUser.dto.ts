import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export interface IUpdatePasswordDto {
  oldPassword: string; // previous password
  newPassword: string; // new password
  updatedAt: number;
}

export class UpdatePasswordDto implements IUpdatePasswordDto {
  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  updatedAt: number;
}
