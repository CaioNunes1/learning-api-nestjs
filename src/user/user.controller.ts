import { Controller, Patch, UseGuards } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {
    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@GetUser('id')user:User){
        return user
    }

@Patch()
editUser(){

}
}
