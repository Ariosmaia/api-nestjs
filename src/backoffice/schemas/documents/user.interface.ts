import { Document } from 'mongoose';

export interface UserDocument extends Document{

	readonly username: string;
	readonly password: string;
	readonly active: boolean;

}
