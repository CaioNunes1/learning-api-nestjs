import { ForbiddenException, Injectable,  } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2'
import { AuthDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()// é usado para indicar que uma classe pode ter suas dependências automaticamente 
//injetadas pelo sistema de Injeção de Dependência (DI) do framework. 
export class AuthService{
    constructor(private prisma:PrismaService){}
    async signup(dto:AuthDto){
        //generate hash password
        try{
            const hash= await argon.hash(dto.password);

        const user=await this.prisma.user.create({
            data:{
                email:dto.email,
                hash,
            },
            
            
        })
        //save the new user in the bd

        delete user.hash;
        //return the saved user
        return user;
        }
        catch(error){
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code=='P2002'){
                    throw new ForbiddenException('Credentials taken')
                }
            }
            throw error
        }
    }
    signin(){

        //find the user by email
        //if the user dont exists throw execption

        //compare passwords
        //if the passwords incorrect throw execption

        //send back de user
        return {msg:"i have signed in"}
    }
}