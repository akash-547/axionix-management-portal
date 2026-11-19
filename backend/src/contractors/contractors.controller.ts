
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { ContractorsService } from './contractors.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('contractors')
@UseGuards(AuthGuard)
export class ContractorsController {
  constructor(private readonly contractorsService: ContractorsService) {}

  private checkAdmin(req: any) {
    if (req.user?.app_metadata?.role !== 'Admin') {
      throw new ForbiddenException('Admin access required');
    }
  }

  @Get()
  async getContractors(@Request() req: any) {
    this.checkAdmin(req);
    return await this.contractorsService.getAllContractors();
  }

  @Post()
  async createContractor(
    @Request() req: any,
    @Body() body: {
      name: string;
      email: string;
      role?: string;
      active?: boolean;
    },
  ) {
    this.checkAdmin(req);
    return await this.contractorsService.createContractor(body);
  }
}
