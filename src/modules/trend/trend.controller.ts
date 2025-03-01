import {Controller, Get} from '@nestjs/common';
import {TrendService} from './trend.service';
import { CsrPage } from '~/src/utils/util-render-page';

@Controller('/')
export class LifeController {
    @Get('/trend')
    handlerLife(@CsrPage({apiService: TrendService}) csrPage: string) {
        return csrPage;
    }
    @Get('/activity-detail')
    handlerActivityDetail(@CsrPage({apiService: TrendService}) csrPage: string) {
        return csrPage;
    }
}
