import { Test, TestingModule } from '@nestjs/testing';
import { UserappController } from './userapp.controller';
import { UserappService } from './userapp.service';

describe('UserappController', () => {
  let userappController: UserappController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserappController],
      providers: [UserappService],
    }).compile();

    userappController = app.get<UserappController>(UserappController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(userappController.getHello()).toBe('Hello World!');
    });
  });
});
