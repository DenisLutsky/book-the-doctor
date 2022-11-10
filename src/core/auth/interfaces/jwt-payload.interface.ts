import { RolesEnum } from '@shared/enums';
import { JwtPayload } from 'jsonwebtoken';

export interface IJwtPayload extends JwtPayload {
  email: string;
  role: RolesEnum;
}
