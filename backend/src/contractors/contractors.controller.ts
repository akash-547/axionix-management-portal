import { Controller, Get, Post, Body } from '@nestjs/common';
import { ContractorsService } from './contractors.service';

@Controller('contractors')
export class ContractorsController {
  constructor(private readonly contractorsService: ContractorsService) {}

  @Get()
  async getContractors() {
    return await this.contractorsService.getAllContractors();
  }

  @Post()
  async createContractor(
    @Body() body: { name: string; email: string; role?: string; active?: boolean },
  ) {
    return await this.contractorsService.createContractor(body);
  }
}