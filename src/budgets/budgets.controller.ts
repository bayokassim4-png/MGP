import { Controller, Get, UseGuards } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Body, Post } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';

@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.budgetsService.findAll();
  }
  @UseGuards(JwtAuthGuard)
@Post()
create(@Body() dto: CreateBudgetDto) {
  return this.budgetsService.create(dto);
}
}