import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrganisationsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.organisation.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        country: true,
        sector: true,
        active: true,
        createdAt: true,
      },
    });
  }
}