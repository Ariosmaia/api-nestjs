import { Document } from 'mongoose';

export interface PetDocument extends Document{

	readonly name: string,
	readonly gender: string,
	readonly kind: string,
	readonly brand: string

}