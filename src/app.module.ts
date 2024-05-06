import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppService } from './app.service';
import { AppInterceptor } from './app.interceptor';
import { ScoBackendFwModule } from './../libs/sco-backend-fw/src/sco-backend-fw/sco-backend-fw.module';
 
@Module({
  imports: [
    ScoBackendFwModule.registerAsync({
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
          strictResult: false,
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
