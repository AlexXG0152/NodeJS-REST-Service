import { IUser } from '../user.interface';

export interface IUpdatePasswordDto {
  oldPassword: string; // previous password
  newPassword: string; // new password
}

export class UpdatePasswordDto implements IUpdatePasswordDto, Partial<IUser> {
  id: string;
  oldPassword: string;
  newPassword: string;
}
