import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('USER_SERVICE') private clientUser: ClientProxy){}

  getHello(): string {
    return 'Hello World!';
  }

  newUser(user: any) {
    this.clientUser.emit('user_created', user)
    return 'send_quee'
  }
}
