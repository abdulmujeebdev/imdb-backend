import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('api/v1/countries')
  async getCountries() {
    return this.appService.getHello();
  }

  @Get('api/v1/genre')
  async getGenreList() {
    return this.appService.getHello();
  }

}
