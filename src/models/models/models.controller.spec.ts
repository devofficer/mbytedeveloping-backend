import { Test, TestingModule } from '@nestjs/testing';
import { ModelsController } from './models.controller';

describe('Models Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ModelsController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ModelsController = module.get<ModelsController>(ModelsController);
    expect(controller).toBeDefined();
  });
});
