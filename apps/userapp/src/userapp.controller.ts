import { Controller, Get } from '@nestjs/common';
import { UserappService } from './userapp.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class UserappController {
  constructor(private readonly userappService: UserappService) { }

  // @Get()
  // getHello(): string {
  //   return this.userappService.getHello();
  // }
  
  @EventPattern('user_created')
  async handleUserCreated(data: any) {
    console.log('Este es el evento entrante', data)
  }
}
