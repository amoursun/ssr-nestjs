import {Controller, Get} from '@nestjs/common';
import {ApiBatchService} from './batch.service';
import { CsrPage } from '~/src/utils/util-render-page';

@Controller('/')
export class BatchController {
    @Get('/batch-share')
    handlerCenter(@CsrPage({apiService: ApiBatchService}) csrPage: string) {
        return csrPage;
    }
}
