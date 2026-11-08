import { Module, Global } from '@nestjs/common';
import { SupabaseService } from './supabase.service';

@Global()
@Module({
  providers: [SupabaseService],
  exports: [SupabaseService], // Isse doosre modules SupabaseService use kar sakein ge
})
export class SupabaseModule {}