import {Controller, Get} from '@nestjs/common';
import {ApiCenterService} from './center.service';
import { CsrPage } from '~/src/utils/util-render-page';

@Controller('/')
export class CenterController {
    @Get('/center')
    handlerCenter(@CsrPage({apiService: ApiCenterService}) csrPage: string) {
        return csrPage;
    }
    @Get('/social-center')
    handlerSocialCenter(@CsrPage({apiService: ApiCenterService}) csrPage: string) {
        return csrPage;
    }
    @Get('/resume/:type')
    handlerResume(@CsrPage({apiService: ApiCenterService}) csrPage: string) {
        return csrPage;
    }
    @Get('/resume-view')
    handlerResumeView(@CsrPage({apiService: ApiCenterService}) csrPage: string) {
        return csrPage;
    }
}
