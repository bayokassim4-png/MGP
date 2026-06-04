import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';

import { PpmController } from './ppm.controller';
import { PpmService } from './ppm.service';

@Module({
  imports: [PrismaModule],
  controllers: [PpmController],
  providers: [PpmService],
})
export class PpmModule {}