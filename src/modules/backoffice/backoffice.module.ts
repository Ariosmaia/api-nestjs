import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './schemas/customer.schema';
import { UserSchema } from './schemas/user.schema';
import { AccountService } from './services/account.service';
import { CustommerService } from './services/customer.service';
import { CustomerController } from './controllers/customer.controller';
import { AddressService } from './services/address.service';

@Module({
	imports: [MongooseModule.forFeature([
		{
			name: "Customer",
			schema: CustomerSchema
		},
		{
			name: "User",
			schema: UserSchema
		}
	])],
	controllers: [CustomerController],
	providers: [
		AccountService, 
		AddressService,
		CustommerService, 
	],
})
export class BackofficeModule { }