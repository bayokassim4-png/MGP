import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  getHealth() {
    return {
      status: 'ok',
      database: 'connected',
      service: 'MGP Backend',
    };
  }
}