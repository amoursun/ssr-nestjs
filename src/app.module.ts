import { Module } from '@nestjs/common'
import { DetailModule } from './modules/detail-page/detail.module'
import { indexModule } from './modules/index-page/index.module'
import { ApModule } from './modules/ap-page/ap.module'

@Module({
	imports: [DetailModule, indexModule, ApModule]
})
export class AppModule {}
