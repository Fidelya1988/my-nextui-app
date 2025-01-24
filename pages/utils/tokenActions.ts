import jwt from 'jsonwebtoken';
import { envConfig } from '../envConfig';
import { UserDto } from '../dto/user.dto';

export const generateAccessToken =(userId: UserDto['id'])=> {
  return jwt.sign({ userId }, envConfig.accessTokenSecret, { expiresIn: '15m' });
}

export const generateRefreshToken = (userId: UserDto['id']) => {
  return jwt.sign({ userId }, envConfig.refreshTokenSecret, { expiresIn: '7d' });
}
