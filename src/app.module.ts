import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackofficeModule } from 'src/modules/backoffice/backoffice.module';
import { StoreModule } from 'src/modules/store/store.module';

// nest generate module backoffice
@Module({
	imports: [
		MongooseModule.forRoot('mongodb://localhost:27017/petshop',
			{ useUnifiedTopology: true, useNewUrlParser: true }),
		TypeOrmModule.forRoot({
			type: 'mssql',
			host: 'ALLAN-DELL',
			port: 56646,
			username: 'petshop',
			password: '150191',
			database: 'petshop',
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			synchronize: true,
		}),
		BackofficeModule,
		StoreModule
	],
	controllers: [],
	providers: [],
})
export class AppModule { }
