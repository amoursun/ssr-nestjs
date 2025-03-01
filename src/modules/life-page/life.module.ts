import {Module} from '@nestjs/common';
import {LifeController} from './life.controller';
import {ApiLifeService} from './life.service';

// 新建life页面Module，此为基础模板
@Module({
    imports: [

    ],
    controllers: [LifeController],
    providers: [ApiLifeService],
})

export class LifeModule {}
