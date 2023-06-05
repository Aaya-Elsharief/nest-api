import { Test } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

import { AppController } from './app.controller';
import { AppService } from './app.service';

const moduleMocker = new ModuleMocker(global);

describe('appController', () => {
  let appController: AppController;
  const appService = {
    getHello: jest.fn().mockReturnValue('Hello World!'),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      // providers: [AppService],
    })
      .useMocker((token) => {
        if (token === AppService) {
          return appService;
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      // .overrideProvider(AppService)
      // .useValue(appService)
      .compile();

    appController = moduleRef.get<AppController>(AppController);
  });

  it('should return Hello World!', () => {
    expect(appController.getHello()).toMatch('Hello World');
  });
});
