import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';

import { LogframeController } from './logframe.controller';
import { LogframeService } from './logframe.service';

@Module({
  imports: [PrismaModule],
  controllers: [LogframeController],
  providers: [LogframeService],
})
export class LogframeModule {}