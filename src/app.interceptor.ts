import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppService } from './app.service';
import { HEADERS } from '../libs/sco-backend-fw/src/sco-backend-fw/headers/headers.constants';

@Injectable()
export class AppInterceptor implements NestInterceptor {

  /* Add App dependencies inyection to context */
  constructor(private readonly appService: AppService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    /* Set Function Files Constants Header */
    context.switchToHttp().getRequest().headers[HEADERS.ROUTES] = this.appService.getFileFunctionsConstants();

    /* Set Providers Header */
    context.switchToHttp().getRequest().headers[HEADERS.PROVIDERS] = this.appService;

    /* Set Validation Passport Callback */
    context.switchToHttp().getRequest().headers[HEADERS.VALIDATION_PASSPORT] = this.appService.validationPassportCallback.bind(this.appService);

    /* Set Types */
    context.switchToHttp().getRequest().headers[HEADERS.TYPES] = this.appService.getTypesConstants();
    
    return next.handle().pipe(
      tap(() => {
        /* After Interceptor Code Here... */
      }),
    );
  }
}