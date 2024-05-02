import { Injectable } from "@nestjs/common";
import { TYPES } from './../libs/sco-backend-fw/src/sco-backend/types/types.constants';
import { IFileFunction } from './../dist/libs/sco-backend-fw/core/interfaces/ifile-function.interface.d';
import { ICore } from './../dist/libs/sco-backend-fw/core/interfaces/icore.interface.d';

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
