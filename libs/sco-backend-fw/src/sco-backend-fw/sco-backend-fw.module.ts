import { DynamicModule, Module, ModuleMetadata, Provider, Type, ValidationPipe } from "@nestjs/common";
import { ScoBackendFwService } from "./sco-backend-fw.service";
import { ScoBackendFwController } from "./sco-backend-fw.controller";
import { ScoBackendFwConfig } from "./config/sco-backend-fw.config";
import { LoggerService } from "./logger/logger.service";
import { FileFunctionsService } from "./file-functions/file-functions.service";
import { HeadersService } from "./headers/headers.service";

interface ScoBackendFwConfigFactory {
  createScoBackendFwConfig(): Promise<ScoBackendFwConfig> | ScoBackendFwConfig;
}

export interface ScoBackendFwAsyncConfig extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<ScoBackendFwConfigFactory>;
  useClass?: Type<ScoBackendFwConfigFactory>;
  useFactory?: (...args: any[]) => Promise<ScoBackendFwConfig> | ScoBackendFwConfig;
}

@Module({})
export class ScoBackendFwModule {
  static register(options: ScoBackendFwConfig): DynamicModule {
    return {
      module: ScoBackendFwModule,
      imports: [

      ],
      controllers: [
        ScoBackendFwController,
      ],
      providers: [
        ScoBackendFwService,
        LoggerService,
        ValidationPipe,
        FileFunctionsService,
        HeadersService,
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
      ],
      exports: [
        //ScoBackendFwService,
        LoggerService,
        FileFunctionsService,
        HeadersService,
      ],
      global: true,
    };
  }

  public static registerAsync(options: ScoBackendFwAsyncConfig): DynamicModule {
    return {
      module: ScoBackendFwModule,
      imports: [
        
      ],
      controllers: [
        ScoBackendFwController,
      ],
      providers: [
        ScoBackendFwService, 
        LoggerService,
        ValidationPipe,
        FileFunctionsService,
        HeadersService,
        ...this.createConnectProviders(options)
      ],
      exports: [
        //ScoBackendFwService,
        LoggerService,
        FileFunctionsService,
        HeadersService,
      ],
      global: true,
    };
  }

  private static createConnectProviders(options: ScoBackendFwAsyncConfig): Provider[] {
    if (options.useFactory) {
      return [
        {
          provide: 'CONFIG_OPTIONS',
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ];
    }

    return [
      {
        provide: 'CONFIG_OPTIONS',
        useFactory: async (optionsFactory: ScoBackendFwConfigFactory) =>
          await optionsFactory.createScoBackendFwConfig(),
        inject: [options.useExisting || options.useClass],
      },
    ];
  }
}
