import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient //consegue conectar com o banco de dados aparentemente
{
    constructor(){
        super({
            datasources:{
                db:{
                    url:'postgresql://postgres:123@localhost:5434/nest?schema=public'
                }
            
            }
            
        })
    }
    
}
