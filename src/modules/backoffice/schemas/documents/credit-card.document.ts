import { Document } from 'mongoose';

export interface CreditCardDocument extends Document{
	
	readonly holder: string,
	readonly number: string,
	readonly expiration: string

}