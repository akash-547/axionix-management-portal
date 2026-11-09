
import {
  Controller,
  Get,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
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

    // Read the role only from trusted Supabase app_metadata.
    const role = user.app_metadata?.role;

    if (!['Admin', 'Contractor'].includes(role)) {
      throw new UnauthorizedException('Invalid or missing user role');
    }

    return {
      id: user.id,
      email: user.email,
      role,
      message: 'Authenticated successfully',
    };
  }
}
