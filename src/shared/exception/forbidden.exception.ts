import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  public constructor(message: string) {
    super(message, HttpStatus.FORBIDDEN);
  }
}
