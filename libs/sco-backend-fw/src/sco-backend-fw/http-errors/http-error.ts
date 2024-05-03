import { HTTP_ERRORS_TYPES } from "./http-errors-types.constants";

export class HttpError {
    message: string;
    code: number;
    type: string;

    constructor(message: string, code: number, type?: string) {
        this.message = message;
        this.code = code; 
        this.type = type && type.length > 0 ? type : HTTP_ERRORS_TYPES.HTTP_EXCEPTION;
    }
}