import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLogframeDto } from './dto/create-logframe.dto';

@Injectable()
export class LogframeService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.logframe.findMany({
      include: {
        project: true,
      },
    });
  }

  async create(dto: CreateLogframeDto) {
    return this.prisma.logframe.create({
      data: {
        projectId: dto.projectId,
        level: dto.level,
        title: dto.title,
        indicator: dto.indicator,
        baseline: dto.baseline,
        target: dto.target,
        verificationSource: dto.verificationSource,
        assumptions: dto.assumptions,
      },
    });
  }
}