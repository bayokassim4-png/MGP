import { Module } from '@nestjs/common';
import { PtbaController } from './ptba.controller';
import { PtbaService } from './ptba.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PtbaController],
  providers: [PtbaService],
})
export class PtbaModule {}