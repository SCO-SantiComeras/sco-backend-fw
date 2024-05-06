import { IFileFunction } from "./ifile-function.interface";

export interface ICore {
    createControllerRoutes(): IFileFunction[];
    validationPassportCallback(authorization: string): Promise<boolean>;
    setCustomTypes(): any;
}