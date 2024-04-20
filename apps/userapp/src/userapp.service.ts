import { Injectable } from '@nestjs/common';

@Injectable()
export class UserappService {
  getHello(): string {
    return 'Hola soy el microservicio!';
  }
}
