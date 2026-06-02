import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBudgetDto } from './dto/create-budget.dto';

@Injectable()
export class BudgetsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.budget.findMany({
      include: {
        project: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });
  }
  async create(dto: CreateBudgetDto) {
  return this.prisma.budget.create({
    data: {
      projectId: dto.projectId,
      name: dto.name,
      amount: dto.amount,
    },
  });
}
}