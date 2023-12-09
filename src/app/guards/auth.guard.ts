import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import * as config from 'config';
import { StandardResponse } from '../../helpers/interceptors/formatter/standard-response';
import { UserService } from '../../common/user/user.service';
import { Types, isValidObjectId } from 'mongoose';

@Injectable()
export class BaseAuthGuard implements CanActivate {
  constructor(protected readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      this.unauthorizedError('Access token not found');
    }
    try {
      if (!isValidObjectId(token)) {
        this.unauthorizedError('Invalid access token');
      }
      const user = await this.userService.getUserById(
        new Types.ObjectId(token),
      );
      if (!user) {
        this.unauthorizedError('Invalid access token');
      }
      request.user = user;
    } catch (error) {
      if (error instanceof HttpException) {
        const { status, message } = error.getResponse() as {
          status: number;
          message: string;
        };
        throw new HttpException(
          new StandardResponse(status, message, {}),
          status,
        );
      }

      const env = config.get('nodeEnv');
      const errorMessage =
        env === 'stage' ? error.message : 'Internal Server Error';
      const responseDto = new StandardResponse(
        HttpStatus.BAD_REQUEST,
        errorMessage,
        {},
      );
      if (env !== 'production') {
        responseDto.errorTrace = error.stack;
      }
      throw new HttpException(responseDto, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private unauthorizedError(message: string) {
    const status = HttpStatus.UNAUTHORIZED;
    throw new HttpException({ status, message }, status);
  }
}
