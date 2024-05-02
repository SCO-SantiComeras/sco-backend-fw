import { Injectable } from "@nestjs/common";
import { TYPES } from './../libs/sco-backend-fw/src/sco-backend/types/types.constants';
import { ICore } from './../libs/sco-backend-fw/src/sco-backend/interfaces/icore.interface';
import { IFileFunction } from "./../libs/sco-backend-fw/src/sco-backend/interfaces/ifile-function.interface";

@Injectable()
export class AppService implements ICore {

    /* Add Own Dependencies */
    constructor(
        // Example: private readonly websocketsService: WebsocketsService,
    ) {}

    /*  Function Files Constants*/
    getFuntionFilesConstants(): IFileFunction[] {
        return [
            /* Global */
            {
                file: 'hello',
                path: 'global',
                resultType: 'string',
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
