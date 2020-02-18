import { Document } from 'mongoose';
import { AddressDocument } from './address.document';
import { CreditCardDocument } from './credit-card.document';
import { UserDocument } from './user.document';
import { PetDocument } from './pet.document';

export interface CustomerDocument extends Document{
	readonly name: string,
	readonly document: string,
	readonly email: string,
	readonly pets: PetDocument[],
	readonly billingAddress: AddressDocument,
	readonly shippingAddress: AddressDocument,
	readonly creditCard: CreditCardDocument,
	readonly user: UserDocument
}