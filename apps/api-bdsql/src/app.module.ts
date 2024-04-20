import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      { 
        name: 'USER_SERVICE', 
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        } },
    ]),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: 'osito2020',
      database: 'BDPrueba',
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      extra: {
        trustServerCertificate: true,
      }
  }),
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 
