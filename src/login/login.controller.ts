import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthLoginDto } from 'src/user/dto/auth-login.dto';

@ApiTags('Login')
@Controller('auth')
export class LoginController {

    constructor (
        private authService: AuthService
    ){

    }

    
    @ApiOperation({ summary: 'Login' })
    @ApiBody({type : AuthLoginDto})
    @Post('login')
    @UseGuards(AuthGuard('local'))
    async login(@Request() req) {
      return this.authService.login(req.user);
    }
}
