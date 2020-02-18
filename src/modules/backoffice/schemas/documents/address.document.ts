import { Document } from 'mongoose';

export interface AddressDocument extends Document{

	readonly zipCode: string,
	readonly street: string,
	readonly number: string,
	readonly complement: string,
	readonly neighborhood: string,
	readonly city: string,
	readonly state: string,
	readonly country: string

}