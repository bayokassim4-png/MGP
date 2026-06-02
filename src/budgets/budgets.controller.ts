import { Controller, Get, UseGuards } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.budgetsService.findAll();
  }
}