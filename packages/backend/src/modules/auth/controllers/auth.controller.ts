import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  UseGuards,
  Request,
  Res,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RegisterDto, LoginDto } from '../dtos/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import express from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return this.authService.validateUser(req.user.userId);
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Body() dto: { name?: string; experienceYears?: number; targetRole?: string },
    @Request() req,
  ) {
    return this.authService.updateProfile(req.user.userId, dto);
  }

  @Post('google/token')
  async googleToken(@Body() dto: { token: string }) {
    if (!dto.token) {
      throw new BadRequestException('Google token is required');
    }

    try {
      // Verify and decode Google token using google-auth-library
      const ticket = await this.authService.verifyGoogleToken(dto.token);
      const user = await this.authService.validateOrCreateGoogleUser(ticket);

      // Generate JWT
      const jwtToken = this.authService.generateToken(user);

      return {
        token: jwtToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          experienceYears: user.experienceYears,
          targetRole: user.targetRole,
          picture: ticket.picture,
        },
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid Google token');
    }
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Request() req, @Res() res: express.Response) {
    // Generate JWT token
    const token = this.authService.generateToken(req.user);

    // Redirect to frontend with token
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const userJson = encodeURIComponent(JSON.stringify(req.user));

    return res.redirect(
      `${frontendUrl}/auth/callback?token=${token}&user=${userJson}`,
    );
  }
}
