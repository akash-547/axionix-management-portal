import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { ContractorsModule } from './contractors/contractors.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // `.env` variables reading enable 
    SupabaseModule, ContractorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}