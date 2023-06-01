import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './service/user/user.service';
import { UserModel } from '../../database/userModel';
import { LoginService } from './service/login/login.service';
import { AuthMiddleware } from '../../middleware/auth/auth.middleware';
import { ProfileModel } from '../../database/profileModel';
import { userProfileModel } from '../../database/userProfile';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserModel,
    ProfileModel,
    userProfileModel,
    LoginService,
  ],
})
export class userModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {
        path: 'users/',
        method: RequestMethod.GET,
      },
      {
        path: 'users/:idUser',
        method: RequestMethod.GET,
      },
      {
        path: 'update/:idUser',
        method: RequestMethod.PUT,
      },
      {
        path: 'delete/:idUser',
        method: RequestMethod.DELETE,
      },
    );
  }
}
