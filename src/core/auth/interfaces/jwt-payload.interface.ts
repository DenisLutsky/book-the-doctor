import { RolesEnum } from '@shared/enums';
import { JwtPayload } from 'jsonwebtoken';

export interface IJwtPayload extends JwtPayload {
  id: string;
  email: string;
  role: RolesEnum;
}
