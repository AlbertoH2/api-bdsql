import { NestFactory } from '@nestjs/core';
import { UserappModule } from './userapp.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // const app = await NestFactory.create(UserappModule);
  // await app.listen(3001);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserappModule,
    {
      transport: Transport.REDIS,
      options: {
        host: 'localhost',
        port: 6379,
      },
    },
  );
  await app.listen();
}
bootstrap();
