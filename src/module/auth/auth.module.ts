import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,  // Import UserModule to provide UserService & dependencies
  ],
  providers: [AuthService, JwtStrategy,],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }