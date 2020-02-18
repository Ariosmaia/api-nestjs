import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from 'src/modules/backoffice/backoffice.module';
import { StoreModule } from 'src/modules/store/store.module';

// nest generate module backoffice
@Module({
  imports: [
		MongooseModule.forRoot('mongodb://localhost:27017/petshop', 
			{useUnifiedTopology: true, useNewUrlParser:true}),
		BackofficeModule,
		StoreModule
	],
  controllers: [],
  providers: [],
})
export class AppModule {}
