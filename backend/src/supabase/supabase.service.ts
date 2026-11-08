import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabaseClient: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL ya Service Role Key backend .env file mein nahi mili!');
    }

    // Supabase client initialize ho raha hai
    this.supabaseClient = createClient(supabaseUrl, supabaseKey);
  }

  // Pure backend mein jahan bhi Supabase connection chahiye hoga, yeh function client return karega
  getClient(): SupabaseClient {
    return this.supabaseClient;
  }
}