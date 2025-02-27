import { Controller, Get } from '@nestjs/common';
import { ApService } from './ap.service';

@Controller()
export class ApController {
  constructor(private readonly appService: ApService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
