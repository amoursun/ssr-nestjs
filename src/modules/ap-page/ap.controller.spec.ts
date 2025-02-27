import { Test, TestingModule } from '@nestjs/testing';
import { ApController } from './ap.controller';
import { ApService } from './ap.service';

describe('AppController', () => {
  let appController: ApController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApController],
      providers: [ApService],
    }).compile();

    appController = app.get<ApController>(ApController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
