import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerDocument } from '../schemas/documents/customer.document';
import { Customer } from '../models/customer.model';
import { Pet } from '../models/pet.model';

@Injectable()
export class PetService {
	constructor(@InjectModel("Customer") private readonly model: Model<CustomerDocument>) {}

	async create(document: string, data: Pet): Promise<Customer> {
		// Ele vai criar como se fosse um registro e vai criar um registro
		const options = {upsert: true, new: true};
		return await this.model.findOneAndUpdate({ document}, {
			$push: {
				pets: data,
			}
		}, options)

	}

	async update(document: string, id: string, data: Pet): Promise<Customer> {
		return await this.model.findOneAndUpdate({ document, 'pets._id': id}, {
			$set: {
				'pets.$': data,
			}
		});
	}
}