import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApprovalDto } from './dto/create-approval.dto';

@Injectable()
export class ApprovalsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.approval.findMany({
      include: {
        expense: true,
        approver: {
          select: {
            id: true,
            email: true,
            fullName: true,
          },
        },
      },
    });
  }

  async create(dto: CreateApprovalDto) {
    const approval = await this.prisma.approval.create({
      data: {
        expenseId: dto.expenseId,
        approverId: dto.approverId,
        level: dto.level,
        approved: dto.approved,
        comment: dto.comment,
      },
    });

    if (!dto.approved) {
      await this.prisma.expense.update({
        where: { id: dto.expenseId },
        data: { status: 'REJECTED' },
      });

      return approval;
    }

    const approvals = await this.prisma.approval.findMany({
      where: {
        expenseId: dto.expenseId,
        approved: true,
      },
    });

    const levels = approvals.map((item) => item.level);

    let status: 'SUBMITTED' | 'APPROVED' = 'SUBMITTED';

    if (
      levels.includes('CHEF_PROJET') &&
      levels.includes('DAF') &&
      levels.includes('DG')
    ) {
      status = 'APPROVED';
    }

    await this.prisma.expense.update({
      where: { id: dto.expenseId },
      data: { status },
    });

    return approval;
  }
}