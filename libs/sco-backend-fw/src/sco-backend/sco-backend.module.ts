import { DynamicModule, Module, ModuleMetadata, Provider, Type, ValidationPipe } from "@nestjs/common";
import { ScoBackendService } from "./sco-backend.service";
import { ScoBackendController } from "./sco-backend.controller";
import { ScoBackendConfig } from "./config/sco-backend.config";
import { LoggerService } from "./logger/logger.service";

interface ScoBackendConfigFactory {
  createScoBackendConfig(): Promise<ScoBackendConfig> | ScoBackendConfig;
}

export interface ScoBackendAsyncConfig extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<ScoBackendConfigFactory>;
  useClass?: Type<ScoBackendConfigFactory>;
  useFactory?: (...args: any[]) => Promise<ScoBackendConfig> | ScoBackendConfig;
}

@Module({})
export class ScoBackendModule {
  static register(options: ScoBackendConfig): DynamicModule {
    return {
      module: ScoBackendModule,
      imports: [

      ],
      controllers: [
        ScoBackendController,
      ],
      providers: [
        ScoBackendService,
        LoggerService,
        ValidationPipe,
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
      ],
      exports: [
        ScoBackendService,
        LoggerService,
      ],
      global: true,
    };
  }

  public static registerAsync(options: ScoBackendAsyncConfig): DynamicModule {
    return {
      module: ScoBackendModule,
      imports: [
        
      ],
      controllers: [
        ScoBackendController,
      ],
      providers: [
        ScoBackendService, 
        LoggerService,
        ValidationPipe,
        ...this.createConnectProviders(options)
      ],
      exports: [
        ScoBackendService,
        LoggerService,
      ],
      global: true,
    };
  }

  private static createConnectProviders(options: ScoBackendAsyncConfig): Provider[] {
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
        useFactory: async (optionsFactory: ScoBackendConfigFactory) =>
          await optionsFactory.createScoBackendConfig(),
        inject: [options.useExisting || options.useClass],
      },
    ];
  }
}
