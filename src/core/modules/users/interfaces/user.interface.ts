import { RolesEnum } from '@shared/enums';
import { IPhoto } from './photo.interface';

export interface IUser {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  photo: IPhoto;
  phone: string;
  role: RolesEnum;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
