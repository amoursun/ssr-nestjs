import {Module} from '@nestjs/common';
import {BatchController} from './batch.controller';
import {ApiBatchService} from './batch.service';

@Module({
    imports: [

    ],
    controllers: [BatchController],
    providers: [ApiBatchService],
})

export class BatchModule {}
