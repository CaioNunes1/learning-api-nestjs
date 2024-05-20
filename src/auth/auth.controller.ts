import { AuthService } from './auth.service';
import { Body, Controller,HttpCode, HttpStatus } from "@nestjs/common";
import { Post } from '@nestjs/common';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController{
    constructor(private authService:AuthService){}//uma instancia de AuthService
    
    
    @Post('signup')
    async signup
    (@Body() dto:AuthDto){
            console.log(dto);
            return this.authService.signup(dto);
        
    }

    @HttpCode(HttpStatus.OK)//o ok significa o 200, verifica o email e password passados e retorna o ok
    @Post('signin')
    async signin(@Body() dto:AuthDto){
        console.log(dto);
        try {
            const token = await this.authService.signin(dto);
            // Retorne o token como parte da resposta
            return { token };
          } catch (error) {
            // Lidere com qualquer erro aqui
            throw error;
          }
    }
}