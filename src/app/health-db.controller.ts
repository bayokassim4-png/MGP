import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('health/db')
export class HealthDbController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async checkDb() {
    await this.prisma.$queryRaw`SELECT 1`;

    return {
      status: 'ok',
      database: 'postgresql',
      prisma: 'connected',
    };
  }
}