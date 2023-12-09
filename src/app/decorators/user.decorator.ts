import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserDto } from '../../common/user/dtos/user.dto';

export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserDto => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
