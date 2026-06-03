import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApprovalsService } from './approvals.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateApprovalDto } from './dto/create-approval.dto';

@Controller('approvals')
export class ApprovalsController {
  constructor(private readonly approvalsService: ApprovalsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.approvalsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateApprovalDto) {
    return this.approvalsService.create(dto);
  }
}   