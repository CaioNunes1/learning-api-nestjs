import { AuthService } from './auth.service';
import { Body, Controller,HttpCode, HttpStatus } from "@nestjs/common";
import { Post } from '@nestjs/common';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController{
    constructor(private authService:AuthService){}//uma instancia de AuthService
    
    
    @Post('signup')
    signup
    (@Body() dto:AuthDto){
        console.log(dto);
        return this.authService.signup(dto);
    }

    @HttpCode(HttpStatus.OK)//o ok significa o 200, verifica o email e password passados e retorna o ok
    @Post('signin')
    signin(@Body() dto:AuthDto){
        console.log(dto);
        return this.authService.signin(dto);
    }
}