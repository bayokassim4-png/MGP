import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';

import { RisksController } from './risks.controller';
import { RisksService } from './risks.service';

@Module({
  imports: [PrismaModule],
  controllers: [RisksController],
  providers: [RisksService],
})
export class RisksModule {}