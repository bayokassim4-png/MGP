import { Controller, Get, UseGuards } from '@nestjs/common';
import { OrganisationsService } from './organisations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('organisations')
export class OrganisationsController {
  constructor(
    private readonly organisationsService: OrganisationsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.organisationsService.findAll();
  }
}