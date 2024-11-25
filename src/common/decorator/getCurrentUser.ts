import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUser = createParamDecorator(
  (data: string | undefined, contex: ExecutionContext) => {
    const request = contex.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user[data];
  },
);
