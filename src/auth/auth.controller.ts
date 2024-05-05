import { AuthService } from './auth.service';
import { Controller } from "@nestjs/common";
import { Post } from '@nestjs/common';

@Controller('auth')
export class AuthController{
    constructor(private authService:AuthService){}//uma instancia de AuthService
    
    @Post('signup')
    signup(){
        return this.authService.signup();
    }

    @Post('signin')
    signin(){
        return this.authService.signin();
    }
}