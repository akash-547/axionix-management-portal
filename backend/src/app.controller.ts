import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  @UseGuards(AuthGuard)
  @Get('whoami')
  getProfile(@Request() req) {
    const user = req.user;
    
    // Supabase metadata se role detect ho raha hai
    const role = user.user_metadata?.role || user.app_metadata?.role || 'Contractor';

    return {
      id: user.id,
      email: user.email,
      role: role,
      message: 'Authenticated successfully',
    };
  }
}