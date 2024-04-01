import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Auth } from './entity/auth.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { TokenService } from '../token/token.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async signup(authDto: AuthDto): Promise<User> {
    const isUserLoginExist = await this.userService.isUserLoginExist(
      authDto.login,
    );

    if (isUserLoginExist) {
      throw new ForbiddenException('User with this login already exists');
    }

    return await this.userService.create(authDto);
  }

  async login(authDto: AuthDto): Promise<Auth> {
    const isUserValid = await this.userService.isUserValid(
      authDto.login,
      authDto.password,
    );
    if (!isUserValid) throw new ForbiddenException('Wrong password or login');

    const user = await this.userService.findOneByLogin(authDto.login);
    const { id: userId, login } = user;

    const [accessToken, refreshToken] = await this.tokenService.getTokens({
      userId,
      login,
    });

    return plainToClass(Auth, { accessToken, refreshToken });
  }

  async refresh(refreshTokenDto: RefreshTokenDto): Promise<Auth> {
    if (!refreshTokenDto.refreshToken) {
      throw new UnauthorizedException('No refresh token');
    }

    try {
      const [accessToken, refreshToken] =
        await this.tokenService.validateRefreshToken(
          refreshTokenDto.refreshToken,
        );
      return plainToClass(Auth, { accessToken, refreshToken });
    } catch {
      throw new ForbiddenException('Invalid refresh token');
    }
  }
}
