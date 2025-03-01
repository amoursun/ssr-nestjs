import {Module} from '@nestjs/common';
import {LifeController} from './trend.controller';
import {TrendService} from './trend.service';

// 新建life页面Module，此为基础模板
@Module({
    imports: [

    ],
    controllers: [LifeController],
    providers: [TrendService],
})

export class TrendModule {}
