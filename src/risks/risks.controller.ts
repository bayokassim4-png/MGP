import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { RisksService } from './risks.service';
import { CreateRiskDto } from './dto/create-risk.dto';

@Controller('risks')
export class RisksController {
  constructor(
    private readonly risksService: RisksService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.risksService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateRiskDto) {
    return this.risksService.create(dto);
  }
}