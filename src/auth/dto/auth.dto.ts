import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class AuthDtoSignUp{
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    password:string

    @IsString()
    name:string
}

export class AuthDtoSignIn{
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    password:string
}