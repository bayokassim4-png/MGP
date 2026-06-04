import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePtbaDto } from './dto/create-ptba.dto';

@Injectable()
export class PtbaService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.ptba.findMany({
      include: {
        project: true,
        component: true,
        activity: true,
      },
    });
  }

  async create(dto: CreatePtbaDto) {
    return this.prisma.ptba.create({
      data: {
        projectId: dto.projectId,
        componentId: dto.componentId,
        activityId: dto.activityId,
        quarter: dto.quarter,
        responsible: dto.responsible,
        plannedBudget: dto.plannedBudget,
        description: dto.description,
      },
    });
  }
}