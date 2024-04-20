import { Module } from '@nestjs/common';
import { UserappController } from './userapp.controller';
import { UserappService } from './userapp.service';

@Module({
  imports: [],
  controllers: [UserappController],
  providers: [UserappService],
})
export class UserappModule {}
