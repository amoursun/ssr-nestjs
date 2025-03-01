import {Controller, Get} from '@nestjs/common';
import {ApiLifeService} from './life.service';
import { CsrPage } from '~/src/utils/util-render-page';

@Controller('/')
export class LifeController {
    @Get('/life/:id')
    handlerLife(@CsrPage({apiService: ApiLifeService}) csrPage: string) {
        return csrPage;
    }
}
