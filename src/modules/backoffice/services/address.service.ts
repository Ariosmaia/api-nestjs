import { Injectable, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerDocument } from '../schemas/documents/customer.document';
import { Customer } from '../models/customer.model';
import { Address } from '../models/address.model';
import { AddressType } from '../enums/address-type.enum';


@Injectable()
export class AddressService {
	constructor(
		@InjectModel("Customer") private readonly model: Model<CustomerDocument>,
		private readonly httpService: HttpService
	) {}

	async create(document: string, data: Address, type: AddressType): Promise<Customer>{
		// Se não existe um endereço ele cria, se existir ele irá atualizar
		const options = { upsert: true};
		if(type == AddressType.Billing) {
			return await this.model.findOneAndUpdate({ document}, {
				$set: {
					billingAddress: data,
				},
			}, options)
		} else {
			return await this.model.findOneAndUpdate({ document}, {
				$set: {
					billingAddress: data,
				},
			}, options)	
		}
	}

	getAddressByZipCode(zipcode: string) {
		const url = `https://viacep.com.br/ws/${zipcode}/json/`;
		return this.httpService.get(url);
	}
}