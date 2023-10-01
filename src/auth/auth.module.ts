import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OrganisationsModule } from 'src/organisations/organisations.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    OrganisationsModule,
    PassportModule,
    JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '60s' } }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
