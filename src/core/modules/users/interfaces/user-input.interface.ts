import { RolesEnum } from '@shared/enums';
import { IPhoto } from './photo.interface';

export interface IUserInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  photo: Partial<IPhoto>;
  phone: string;
  role: RolesEnum;
}
