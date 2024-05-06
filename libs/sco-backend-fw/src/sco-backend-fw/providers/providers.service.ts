import { Injectable } from "@nestjs/common";

@Injectable()
export class ProvidersService {

  constructor() {}

  public createProviders(constructorName: string, context: any): any[] {
    // ConstructorName = this.constructor.name;
    /* Set Own Class Provider Name */
    const ownProviderName: string = `${constructorName[0].toLocaleLowerCase()}${constructorName.substring(1, constructorName.length)}`;

    /* Set Own Class Provider */
    let providers: any[] = [];
    providers[ownProviderName] = context;

    /* Get Own Class Providers Keys */
    const keys: string[] = Object.keys(context);

    /* Push Own Class Provider Value */
    for (const key of keys) {
      providers[key] = context[key];
    }

    return providers;
  }

  public getContextname(context: any): string {
    if (context && context.constructor && context.constructor.name && context.constructor.name.length > 0) {
      return context.constructor.name;
    }

    return undefined;
  }
}
