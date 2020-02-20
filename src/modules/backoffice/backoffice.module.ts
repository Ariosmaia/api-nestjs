import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { CustomerSchema } from './schemas/customer.schema';
import { UserSchema } from './schemas/user.schema';

import { AddressService } from './services/address.service';
import { AccountService } from './services/account.service';
import { AuthService } from 'src/shared/services/auth.service';
import { CustommerService } from './services/customer.service';
import { PetService } from './services/pet.service';
import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';


import { AccountController } from './controllers/account.controller';
import { AddressController } from './controllers/address.controller';
import { CustomerController } from './controllers/customer.controller';
import { PetController } from './controllers/pet.controller';

@Module({
	imports: [
		PassportModule.register({defaultStrategy: 'jwt'}),
		JwtModule.register({
			secretOrPrivateKey: process.env.SECRET,
			signOptions: {
				expiresIn: 3600,
			}
		}),
		MongooseModule.forFeature([
		{
			name: "Customer",
			schema: CustomerSchema
		},
		{
			name: "User",
			schema: UserSchema
		}
	])],
	controllers: [
		AccountController,
		AddressController,
		CustomerController,
		PetController
	],
	providers: [
		AccountService, 
		AddressService,
		CustommerService,
		AuthService,
		PetService,
		JwtStrategy 
	],
})
export class BackofficeModule { }
