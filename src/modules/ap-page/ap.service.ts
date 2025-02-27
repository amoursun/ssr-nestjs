import { Injectable } from '@nestjs/common';

@Injectable()
export class ApService {
  getHello(): string {
    return 'Hello World!';
  }
}
