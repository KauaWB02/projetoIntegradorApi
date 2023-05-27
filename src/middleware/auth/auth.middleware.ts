import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import * as jsonwebtoken from 'jsonwebtoken';
import { jwt as jwtKey } from '../../config/app';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, next: () => void) {
    try {
      const token = req.headers.authorization;

      if (!token)
        throw {
          message: 'Token não informado, favor verificar',
          status: 400,
        };
      jsonwebtoken.verify(token, jwtKey.secret, (error: any) => {
        if (error) {
          throw {
            message: 'Autorização negada, favor verificar Token',
            status: 403,
          };
        }
        next();
      });
    } catch (e) {
      throw new HttpException(
        {
          status: e.status,
          error: e.message,
        },
        e.status,
      );
    }
  }
}
