import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { appConfig } from 'src/configs';

import { RolesEnum } from '@shared/enums';
import { UnauthorizedException } from '@nestjs/common';
import { IJwtPayload } from '../interfaces';

const SALT_ROUNDS = 10;

export const hashPassword = async (plainPassword: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);

  return await bcrypt.hash(plainPassword, salt);
};

export const generateJWT = (id: string, email: string, role: RolesEnum): string => {
  const jwtPayload = { id, email, role };

  const token = jwt.sign(jwtPayload, appConfig.jwtSecret, { expiresIn: '7d' });

  return `BTD_${token}`;
};

export const validateToken = (bearer: string): IJwtPayload => {
  try {
    const token = bearer.split('BTD_')[1];

    const payload = jwt.verify(token, appConfig.jwtSecret);

    return payload as IJwtPayload;
  } catch (err) {
    throw new UnauthorizedException(err.message);
  }
};
