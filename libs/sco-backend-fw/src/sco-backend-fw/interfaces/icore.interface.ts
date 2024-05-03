import { IFileFunction } from "./ifile-function.interface";

export interface ICore {
    getFileFunctionsConstants(): IFileFunction[];
    validationPassportCallback(authorization: string): Promise<boolean>;
    getTypesConstants(): any;
}