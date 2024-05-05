import { Injectable } from "@nestjs/common";

@Injectable({})// é usado para indicar que uma classe pode ter suas dependências automaticamente 
//injetadas pelo sistema de Injeção de Dependência (DI) do framework. 
export class AuthService{
    signup(){
        return {msg:"i have signed up"}
    }
    signin(){
        return {msg:"i have signed in"}
    }
}