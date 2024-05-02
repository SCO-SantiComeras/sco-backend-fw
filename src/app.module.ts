import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppService } from './app.service';
import { AppInterceptor } from './app.interceptor';
import { ScoBackendModule } from './../libs/sco-backend-fw/src/sco-backend/sco-backend.module';
 
@Module({
  imports: [
    ScoBackendModule.registerAsync({
      imports: [],
      useFactory: () => {
        return {
          verbose: true,
          path: './src',
          folder: 'controller',
          extension: 'ts',
          response: false,
          validationPipe: true,
          validationPassport: true,
        };
      },
      inject: [],
    }),
  ],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AppInterceptor,
    },
  ],
})

export class AppModule {}
