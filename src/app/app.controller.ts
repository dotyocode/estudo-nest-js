import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('home')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return 'oi';
  }

  @Get('exemplo')
  exemplo(): string {
    return this.appService.getExemplo();
  }
}
