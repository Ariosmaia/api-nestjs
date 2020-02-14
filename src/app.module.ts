import { Module } from '@nestjs/common';
import { BackofficeModule } from './backoffice/backoffice.module';
import { MongooseModule } from '@nestjs/mongoose';

// nest generate module backoffice
@Module({
  imports: [
		MongooseModule.forRoot('mongodb://localhost:27017/petshop', 
			{useUnifiedTopology: true, useNewUrlParser:true}),
		BackofficeModule
	],
  controllers: [],
  providers: [],
})
export class AppModule {}
