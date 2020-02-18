import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerDocument } from '../schemas/documents/customer.document';
import { Customer } from '../models/customer.model';
import { QueryDto } from '../dtos/query.dto';
import { UpdateCustomerDto } from '../dtos/customer/update-customer.dto';

@Injectable()
export class CustommerService {
	constructor(@InjectModel("Customer") private readonly model: Model<CustomerDocument>) {}

	async findAll(): Promise<Customer[]> {
		return await this.model
			.find({}, 'name email document')
			.sort('name')
			.exec();
	}

	async find(document: string): Promise<Customer> {
		return await this.model
			.findOne({document})
			.populate('user', 'username')
			.exec();
	}

	async query(model: QueryDto): Promise<Customer[]> {
		return await this.model
			.find(model.query,
				model.fields,
				{
					skip: model.skip,
					limit: model.take,
				})
				.sort(model.sort)
				.exec();
	}

	async create(data: Customer): Promise<Customer> {
		const customer = new this.model(data);
		return await customer.save();
	}

	async update(document: string, data: UpdateCustomerDto): Promise<Customer> {
		return await this.model.findOneAndUpdate({ document }, data );
	}

}