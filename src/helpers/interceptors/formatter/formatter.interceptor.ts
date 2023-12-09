import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import * as config from 'config';
import { catchError, map } from 'rxjs/operators';
import { StandardResponse } from './standard-response';

@Injectable()
export class ResponseFormatter implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response: StandardResponse = {
          status: context.switchToHttp().getResponse().statusCode,
          message: 'ok',
          payload: data,
        };
        return response;
      }),
      catchError((error) => {
        if (error instanceof HttpException) {
          const status = error.getStatus();
          const message = error.getResponse() as string;
          return throwError(
            () =>
              new HttpException(
                new StandardResponse(status, message, {}),
                status,
              ),
          );
        } else {
          const env = config.get('nodeEnv');
          const errorMessage =
            env === 'stage' ? error.message : 'Internal Server Error';
          const responseDto = new StandardResponse(
            HttpStatus.INTERNAL_SERVER_ERROR,
            errorMessage,
            {},
          );
          if (env !== 'production') {
            responseDto.errorTrace = error.stack;
          }
          return throwError(
            () =>
              new HttpException(responseDto, HttpStatus.INTERNAL_SERVER_ERROR),
          );
        }
      }),
    );
  }
}
