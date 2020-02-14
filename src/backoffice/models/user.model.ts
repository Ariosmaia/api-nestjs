import { Document } from 'mongoose';

export class User extends Document{

	constructor(
		public username: string,
		public password: string,
		public active: boolean
	) {
		super();
	}
}