import { AuthService } from './auth.service';
import { Body, Controller, } from "@nestjs/common";
import { Post } from '@nestjs/common';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController{
    constructor(private authService:AuthService){}//uma instancia de AuthService
    
    @Post('signup')
    signup
    (@Body() dto:AuthDto){//parseintpipe transforma para numero
        console.log(dto);
        return this.authService.signup(dto);
    }

    @Post('signin')
    signin(){
        return this.authService.signin();
    }
}