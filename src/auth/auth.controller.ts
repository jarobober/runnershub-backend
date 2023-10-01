import { Controller } from '@nestjs/common';
import {
  Get,
  Param,
  Post,
  Body,
  Delete,
  HttpCode,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt.guard';
import { OrganisationsService } from 'src/organisations/organisations.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private organisationsService: OrganisationsService,
  ) {
    this.authService = authService;
    this.organisationsService = organisationsService;
  }

  @Post('/register')
  async register(@Request() req) {
    console.log('req', req);
    const body = req.body;
    return this.organisationsService.create(
      body.name,
      body.email,
      body.password,
    );
  }

  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.organisation;
  }
}
