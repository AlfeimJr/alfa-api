import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginService } from 'src/login/login.service';

@Injectable()
export class AuthService {

    constructor(
      private loginService: LoginService,
      private jwtService: JwtService
      ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.loginService.findOne(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log(user);
    
    const payload = { username: user.email, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

}
