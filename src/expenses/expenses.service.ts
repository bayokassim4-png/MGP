import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.expense.findMany({
      include: {
        budget: true,
      },
    });
  }

  async create(dto: CreateExpenseDto) {
    const expense = await this.prisma.expense.create({
      data: {
        budgetId: dto.budgetId,
        description: dto.description,
        amount: dto.amount,
      },
    });

    await this.prisma.budget.update({
      where: { id: dto.budgetId },
      data: {
        consumedAmount: {
          increment: dto.amount,
        },
      },
    });

    return expense;
  }
}