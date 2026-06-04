import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PtbaService } from './ptba.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePtbaDto } from './dto/create-ptba.dto';

@Controller('ptba')
export class PtbaController {
  constructor(private readonly ptbaService: PtbaService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.ptbaService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreatePtbaDto) {
    return this.ptbaService.create(dto);
  }
}