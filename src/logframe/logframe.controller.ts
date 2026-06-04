import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { LogframeService } from './logframe.service';
import { CreateLogframeDto } from './dto/create-logframe.dto';

@Controller('logframe')
export class LogframeController {
  constructor(
    private readonly logframeService: LogframeService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.logframeService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateLogframeDto) {
    return this.logframeService.create(dto);
  }
}