import { Injectable } from "@nestjs/common";
import { TYPES } from './../libs/sco-backend-fw/src/sco-backend-fw/types/types.constants';
import { ICore } from './../libs/sco-backend-fw/src/sco-backend-fw/interfaces/icore.interface';
import { IFileFunction } from "./../libs/sco-backend-fw/src/sco-backend-fw/interfaces/ifile-function.interface";

@Injectable()
export class AppService implements ICore {

    /* Add Own Dependencies */
    constructor(
        // Example: private readonly websocketsService: WebsocketsService,
    ) {}

    /*  Function Files Constants*/
    getFileFunctionsConstants(): IFileFunction[] {
        return [
            /* Global */
            {
                file: 'hello',
                path: 'global',
                resultType: TYPES.STRING,
            },
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
    getTypesConstants(): any {
        return {
            ...TYPES,
        }
    }
}
