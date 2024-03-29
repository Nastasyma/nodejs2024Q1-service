import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Auth } from './entity/auth.entity';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthDto } from './dto/auth.dto';
import { Public } from './constants';
import { ValidationTokenPipe } from 'src/token/token.pipe';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() authDto: AuthDto): Promise<User> {
    return await this.authService.signup(authDto);
  }

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  async login(@Body() authDto: AuthDto): Promise<Auth> {
    return await this.authService.login(authDto);
  }

  @Post('refresh')
  @UseGuards(AuthGuard)
  @Public()
  @UsePipes(new ValidationTokenPipe())
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshTokenDto: RefreshTokenDto): Promise<Auth> {
    return await this.authService.refresh(refreshTokenDto);
  }
}
