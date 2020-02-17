import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerDocument } from '../schemas/documents/customer.document';
import { Customer } from '../models/customer.model';
import { Address } from '../models/address.model';
import { Pet } from '../models/pet.model';


@Injectable()
export class CustommertService {
	constructor(@InjectModel("Customer") private readonly model: Model<CustomerDocument>) {}

	async create(data: Customer): Promise<Customer> {
		const customer = new this.model(data);
		return await customer.save();
	}

	async addBillingAddress(document: string, data: Address): Promise<Customer> {
		// Se não existe um endereço ele cria, se existir ele irá atualizar
		const options = { upsert: true };
		return await this.model.findOneAndUpdate({ document}, {
			$set: {
				billingAddress: data,
			},
		}, options)
	}

	async addShippingAddress(document: string, data: Address): Promise<Customer> {
		// Se não existe um endereço ele cria, se existir ele irá atualizar
		const options = { upsert: true };
		return await this.model.findOneAndUpdate({ document}, {
			$set: {
				shippingAddress: data,
			},
		}, options)
	}

	async createPet(document: string, data: Pet): Promise<Customer> {
		// Ele vai criar como se fosse um registro e vai criar um registro
		const options = {upsert: true, new: true};
		return await this.model.findOneAndUpdate({ document}, {
			$push: {
				pets: data,
			}
		}, options)

	}

	async updatePet(document: string, id: string, data: Pet): Promise<Customer> {
		return await this.model.findOneAndUpdate({ document, 'pets._id': id}, {
			$set: {
				'pets.$': data,
			}
		});

	}

}