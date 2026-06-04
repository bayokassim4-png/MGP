import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const [
      projects,
      budgets,
      expenses,
      approvals,
      ptbaEntries,
      logframeEntries,
      risks,
      ppmEntries,
    ] = await Promise.all([
      this.prisma.project.count(),
      this.prisma.budget.findMany(),
      this.prisma.expense.count(),
      this.prisma.approval.count(),
      this.prisma.ptba.count(),
      this.prisma.logframe.count(),
      this.prisma.risk.count(),
      this.prisma.ppm.count(),
    ]);

    const budgetTotal = budgets.reduce(
      (sum, item) => sum + Number(item.amount),
      0,
    );

    const consumedAmount = budgets.reduce(
      (sum, item) => sum + Number(item.consumedAmount),
      0,
    );

    return {
      projects,
      budgets: budgets.length,
      expenses,
      approvals,
      ptbaEntries,
      logframeEntries,
      risks,
      ppmEntries,

      budgetTotal,
      consumedAmount,
      availableAmount:
        budgetTotal - consumedAmount,
    };
  }
}