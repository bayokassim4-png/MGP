import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { PpmService } from './ppm.service';
import { CreatePpmDto } from './dto/create-ppm.dto';

@Controller('ppm')
export class PpmController {
  constructor(
    private readonly ppmService: PpmService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.ppmService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreatePpmDto) {
    return this.ppmService.create(dto);
  }
}