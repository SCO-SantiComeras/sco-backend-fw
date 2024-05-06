<p align="center">
  <img src="https://scoapps.es/img/sco-backend-fw-logo.png" width="400" alt="ScoBackendFw-Logo" />
</p>

<h1><p align="center">Sco Backend FW</p></h1>

<p align="center">
  A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> and <a href="http://nestjs.com" target="_blank">Nest</a> framework for building efficient, scalable and no reload changes server-side applications.
</p>

## Description

[ScoBackendFw](https://github.com/SCO-SantiComeras/sco-backend-fw) framework TypeScript features export.

## Installation

<pre>
npm i sco-backend-fw
</pre>

## Main features

- ScoBackendFw
  - ScoBackendFwModule
  - ScoBackendFwConfig
- FileFunctions
  - FileFunctionsService
- Headers
  - HeadersService
  - HeadersConstants
- HttpErrors
  - HttpError
  - HttpErrorsConstants
  - HttpErrorsTypesConstants
  - HttpStatusConstants
- Interfaces
  - ICore
  - IFileFunction
  - IFileFunctionParam
  - IFileFunctionResponse
- Logger
  - LoggerService
- Types
  - TypesConstants

## Initial config parameters
<pre>
# App.module ScoBackendFwModule Import

@Module({
  imports: [
    ScoBackendFwModule.registerAsync({
      imports: [],
      useFactory: () => {
        return {
          verbose: true, // Shows global api info logs
          path: './src', // Main path where controller folder is ubicated
          folder: 'controller', // Controller folder name
          extension: 'ts', // Controller files extension (TS / JS)
          response: false, // Enable global api interface response
          validationPipe: true, // Enable global validation pipe for Objects & Dtos
          validationPassport: true, // Enable global validation passport for authentification header
          strictResult: false, // Enable strict result on controller files
        };
      },
      inject: [],
    }),
  ]
  providers: [
    CoreService,
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AppInterceptor,
    },
  ],
})
</pre>

<pre>
# App.interceptor file

@Injectable()
export class AppInterceptor implements NestInterceptor {

  /* Add App dependencies inyection to context */
  constructor(
    private readonly coreService: CoreService,
    private readonly appService: AppService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    /* Set Function Files Constants Header */
    context.switchToHttp().getRequest().headers[HEADERS.ROUTES] = this.coreService.createControllerRoutes();

    /* Set Providers Header */
    context.switchToHttp().getRequest().headers[HEADERS.PROVIDERS] = this.appService;

    /* Set Validation Passport Callback */
    context.switchToHttp().getRequest().headers[HEADERS.VALIDATION_PASSPORT] = this.coreService.validationPassportCallback.bind(this.coreService);

    /* Set Custom Types (Optional) */
    context.switchToHttp().getRequest().headers[HEADERS.TYPES] = this.coreService.setCustomTypes();
    
    return next.handle().pipe(
      tap(() => {
        /* After Interceptor Code Here... */
      }),
    );
  }
}
</pre>

<pre>
# App.service file

@Injectable()
export class AppService {

  /* Add Own Dependencies */
  constructor(
      private readonly httpErrorsService: HttpErrorsService,
  ) {}
}
</pre>

<pre>
# global.routes controller-routes file

export const GLOBAL_ROUTES_PATH: string = 'global';

export const GLOBAL_ROUTES_NAMES = {
  HELLO: 'hello',
};

export const GLOBAL_ROUTES: IFileFunction[] = [
  {
    endpoint: true,
    file: GLOBAL_ROUTES_NAMES.HELLO,
    path: GLOBAL_ROUTES_PATH,
    resultType: TYPES.STRING,
    validationPipe: false,
    validationPassport: false,
  },
];
</pre>

<pre>
# hello controller file

/* Body Example 
(body: { n1: number; n2: number; }) => {
  return body.n1 + body.n2;
}
*/

/* Async Example
async () => {
  return 'Hello World!';
} */

/* Providers Example
async (body: {

  }, 
  providers: {
    httpErrorsService? : HttpErrorsService;
  },
) => {
  return {
    type: providers.httpErrorsService.HTTP_ERRORS_TYPES.HTTP_EXCEPTION, 
    message: providers.httpErrorsService.HTTP_ERRORS_CONSTANTS.USERS.USER_NAME_ALREADY_EXISTS, 
    code: providers.httpErrorsService.HTTP_STATUS.CONFLICT
  } as HttpError;

  // Decostuction providers example
  const { httpErrorsService } = providers;
  return {
    type: httpErrorsService.HTTP_ERRORS_TYPES.HTTP_EXCEPTION, 
    message: httpErrorsService.HTTP_ERRORS_CONSTANTS.USERS.USER_NAME_ALREADY_EXISTS, 
    code: httpErrorsService.HTTP_STATUS.CONFLICT
  } as HttpError;
} */

async () => {
  return 'Hello World!';
}
</pre>

<pre>
# Core.service Core file

@Injectable()
export class CoreService implements ICore {

  constructor(private readonly fileFunctionsService: FileFunctionsService) {
    this.fileFunctionsService.setFileFunctions(this.createControllerRoutes());
  }
  
  /* Function Files Constants */
  createControllerRoutes(): IFileFunction[] {
    return [
      /* Global */
      ...GLOBAL_ROUTES,

      /* Calculator */
      ...CALCULATOR_ROUTES,
  
      /* Users */
      ...USERS_ROUTES,
    ];
  }

  /* Validation Passport */ 
  async validationPassportCallback(authorization: string): Promise<boolean> {
    if (!authorization) {
      return false;
    }

    return true;
  }

  /* Types */
  setCustomTypes(): any {
    return {
      ...TYPES, // Default Types, you are not required to set default types
    }
  }
}
</pre>

## Example
- http://scoapps.es:9000

## Support

SCO Backend FW is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers.

## Stay in touch

- Author - [Santiago Comeras Oteo](https://santiagocomerasoteo.es)

## License

Sco Backend FW is [MIT licensed](LICENSE).
