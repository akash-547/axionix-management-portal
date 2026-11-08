import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabaseClient: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL or Service Role Key was not found in the backend .env file!');
    }

    // The Supabase client is being initialized.
    this.supabaseClient = createClient(supabaseUrl, supabaseKey);
  }

  // This function returns the client wherever a Supabase connection is needed in the backend.
  getClient(): SupabaseClient {
    return this.supabaseClient;
  }
}