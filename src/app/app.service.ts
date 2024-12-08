import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getExemplo(): string {
    return 'Hello exemplo!';
  }
}
