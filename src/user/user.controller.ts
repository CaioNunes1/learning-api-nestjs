import { Controller, Patch, UseGuards } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { Query } from '@nestjs/common';
import { UserService} from './user.service'

@Controller('users')
export class UserController {
    constructor(private readonly userService:UserService){}

    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@GetUser('id')user:User){
        return user
    }

@Patch()
editUser(){

}

    
    @Get('search')
    async searchUser(@Query('email') email:string):Promise<User[]>{
        return this.userService.searchUsers(email);
    }



}
