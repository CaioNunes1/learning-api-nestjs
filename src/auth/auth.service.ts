import { Injectable,  } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()// é usado para indicar que uma classe pode ter suas dependências automaticamente 
//injetadas pelo sistema de Injeção de Dependência (DI) do framework. 
export class AuthService{
    constructor(private prima:PrismaService){

    }
    signup(){
        return {msg:"i have signed up"}
    }
    signin(){
        return {msg:"i have signed in"}
    }
}