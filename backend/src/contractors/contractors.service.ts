import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ContractorsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  // 1. List Contractors (GET)
  async getAllContractors() {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase.from('contractors').select('*');

    if (error) {
      throw new Error(`Contractors fetch karne mein error: ${error.message}`);
    }

    return data;
  }

  // 2. Create Contractor (POST)
  async createContractor(contractorData: { name: string; email: string; role?: string; active?: boolean }) {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from('contractors')
      .insert([
        {
          name: contractorData.name,
          email: contractorData.email,
          role: contractorData.role || 'Contractor',
          active: contractorData.active !== undefined ? contractorData.active : true,
        },
      ])
      .select();

    if (error) {
      throw new Error(`Contractor create karne mein error: ${error.message}`);
    }

    return data[0];
  }
}