import { Injectable } from "@nestjs/common";
import { IFileFunction } from "../interfaces/ifile-function.interface";
import { ScoBackendFwService } from "../sco-backend-fw.service";

@Injectable()
export class FileFunctionsService {

  private _FILE_FUNCTIONS: IFileFunction[];

  constructor(private readonly scoBackendFwService: ScoBackendFwService) {
    this._FILE_FUNCTIONS = [];
  }

  /* Management File Functions */
  public setFileFunctions(functionFiles: IFileFunction[]): void {
    if (functionFiles && functionFiles.length > 0) {
      this._FILE_FUNCTIONS = functionFiles;
    }
  }

  public addFileFunctions(functionFiles: IFileFunction[]): IFileFunction[] {
    if (this._FILE_FUNCTIONS && this._FILE_FUNCTIONS.length == 0) {
      this._FILE_FUNCTIONS = functionFiles;
      return;
    }

    let deleteIndex: number[] = [];
    for (const file of functionFiles) {
      const existFile: IFileFunction = this._FILE_FUNCTIONS.find(f =>
        f.file.toUpperCase() == file.file.toUpperCase() &&
        f.path.toUpperCase() == file.path.toUpperCase()
      );

      if (!existFile) {
        continue;
      }

      const index: number = functionFiles.indexOf(file);
      if (index != -1) {
        deleteIndex.push(index);
      }
    }

    if (deleteIndex && deleteIndex.length > 0) {
      for (let i = deleteIndex.length-1; i >= 0; i--) {
        functionFiles.splice(deleteIndex[i], 1);
      }
    }

    let newFileFunctions: IFileFunction[] = [];
    if (functionFiles && functionFiles.length > 0) {
      newFileFunctions = [
        ...this._FILE_FUNCTIONS,
        ...functionFiles,
      ]
    } else {
      newFileFunctions = this._FILE_FUNCTIONS;
    }

    this._FILE_FUNCTIONS = newFileFunctions;
    return this._FILE_FUNCTIONS;
  }

  public getFileFunctions(): IFileFunction[] {
    return this._FILE_FUNCTIONS;
  }

  public removeFileFunction(path: string, file: string): IFileFunction[] {
    const existFile: IFileFunction = this._FILE_FUNCTIONS.find(f =>
      f.file.toUpperCase() == file.toUpperCase() &&
      f.path.toUpperCase() == path.toUpperCase()
    );

    if (!existFile) {
      return undefined;
    }

    const index: number = this._FILE_FUNCTIONS.indexOf(existFile);
    if (index != -1) {
      this._FILE_FUNCTIONS.splice(index, 1);
      return this._FILE_FUNCTIONS;
    }

    return undefined;
  }

  /* Executable File Funtions */
  public getExecutableFileFunction(path: string, file: string): any {
    const existFileFunction: IFileFunction = this._FILE_FUNCTIONS.find(f => 
      f.path.toUpperCase() == path.toUpperCase() 
      && f.file.toUpperCase() == file.toUpperCase()
    );

    if (!existFileFunction) {
      console.log(`[getExecutableFunction] File '${path}/${file}' file function not exist`);
      return undefined;
    }
    
    const buffer: string = this.scoBackendFwService.getFileFunctionBuffer(existFileFunction);
    if (!buffer) {
      console.log(`[getExecutableFunction] File '${path}/${file}' unnable to get buffer`);
      return undefined;
    }

    const exec: any = this.scoBackendFwService.convertBufferToFunction(buffer);
    if (!exec) {
      console.log(`[getExecutableFunction] File '${path}/${file}' unnable to convert buffer`);
      return undefined;
    }

    return exec;
  }

  public async exec(path: string, file: string, body: any = {}, providers: any = {}) {
    const executable: any = this.getExecutableFileFunction(path, file);
    const result: any = await executable(body, providers);
    
    if (result && result.type && result.type == 'HttpException') {
      return undefined;
    }

    return result;
  }

  /* Providers File Functions */
  public createProviders(context: any, constructorName: string = undefined): any[] {
    /* Set Own Class Provider Name */
    let ownProviderName: string = ``;
    if (constructorName && constructorName.length > 0) {
      ownProviderName = `${constructorName[0].toLocaleLowerCase()}${constructorName.substring(1, constructorName.length)}`;
    } else {
      const contextName: string = this.getContextname(context);
      ownProviderName = `${contextName[0].toLocaleLowerCase()}${contextName.substring(1, contextName.length)}`;
    }

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
