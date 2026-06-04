import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePpmDto } from './dto/create-ppm.dto';

@Injectable()
export class PpmService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.ppm.findMany({
      include: {
        project: true,
      },
    });
  }

  async create(dto: CreatePpmDto) {
    return this.prisma.ppm.create({
      data: {
        projectId: dto.projectId,
        title: dto.title,
        method: dto.method,
        estimatedAmount: dto.estimatedAmount,
        responsible: dto.responsible,
      },
    });
  }
}