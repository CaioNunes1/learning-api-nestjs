import { ForbiddenException, Injectable,  } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2'
import { AuthDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()// é usado para indicar que uma classe pode ter suas dependências automaticamente 
//injetadas pelo sistema de Injeção de Dependência (DI) do framework. 
export class AuthService{
    constructor(private prisma:PrismaService, private jwt:JwtService, private config:ConfigService){}
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
        console.log('usuário logado')
        return this.signToken(user.id,user.email);//retornando o token dizendo que o usuário existe e logou
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
    async signin(dto:AuthDto){

        //find the user by email
        const user= await this.prisma.user.findUnique({
            where:{
                email:dto.email,
            },
        });

        
        
        //if the user dont exists throw execption
        if(!user) throw new ForbiddenException('Credentials incorrect')
        
        //compare passwords
        const pwMatches = await argon.verify(
            user.hash,dto.password//verifica se a senha passada pelo usuário corresponde ao hash dessa senha que está no banco de dados
        );
        //if the passwords incorrect throw execption
        if(!pwMatches) throw new ForbiddenException('Password incorrect');

        //send back de user

        return this.signToken(user.id,user.email);//retornando o token dizendo que o usuário existe e logou
    }

    async signToken(userId:number,email:string) :Promise<{access_token:string}>{//vai retornar um token dizendo que o usuário foi criado

        const payload={
            sub:userId,
            email,
        };

        const secret=this.config.get('JWT_SECRET')

        console.log('usuário logado')
        const token= await this.jwt.signAsync(payload,{
            expiresIn:'15m',//quando damos o token ao user, o usuário pode fazer ações na nossa plataforma que estamos contruindo por 15 min, como 
            //por exemplo o sigaa
            secret: secret// basicamente a senha
        })

     return {
        access_token:token,
     };
        
    }
}