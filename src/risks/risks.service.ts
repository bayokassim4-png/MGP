import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRiskDto } from './dto/create-risk.dto';

@Injectable()
export class RisksService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.risk.findMany({
      include: {
        project: true,
      },
    });
  }

  async create(dto: CreateRiskDto) {
    return this.prisma.risk.create({
      data: {
        projectId: dto.projectId,
        title: dto.title,
        description: dto.description,
        probability: dto.probability,
        impact: dto.impact,

        criticality:
          dto.probability * dto.impact,

        mitigationMeasure:
          dto.mitigationMeasure,

        owner: dto.owner,
      },
    });
  }
}