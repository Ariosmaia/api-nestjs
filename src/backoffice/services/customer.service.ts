import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerDocument } from '../schemas/documents/customer.document';
import { Customer } from '../models/customer.model';


@Injectable()
export class CustommertService {
	constructor(@InjectModel("Customer") private readonly model: Model<CustomerDocument>) {}

	async create(data: Customer): Promise<Customer> {
		const customer = new this.model(data);
		return await customer.save();
	}

}