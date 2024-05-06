import { IFileFunctionParam } from "./ifile-function-param.interface";

export interface IFileFunction {
    endpoint?: boolean;
    file: string;
    path: string;
    params?: IFileFunctionParam[];
    resultType: string;
    validationPipe?: boolean;
    validationPassport?: boolean;
}