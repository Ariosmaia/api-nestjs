import { Controller, Get, Post, Param, Body, UseInterceptors, HttpException, HttpStatus, Put } from "@nestjs/common";
import { Md5 } from 'md5-typescript';
import { Result } from "../models/result.model";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { CreateCustomerContract } from "../contracts/customer/create-customer.contract";
import { CreateCustomerDto } from "../dtos/customer/create-customer.dto";
import { AccountService } from "../services/account.service";
import { User } from "../models/user.model";
import { CustommerService } from "../services/customer.service";
import { Customer } from "../models/customer.model";
import { QueryDto } from "../dtos/query.dto";
import { UpdateCustomerContract } from "../contracts/customer/update-customer.contract";
import { UpdateCustomerDto } from "../dtos/customer/update-customer.dto";
import { CreateCreditCardContract } from "../contracts/customer/create-credit-card.contract";
import { CreditCard } from "../models/credit-card.model";
import { QueryContract } from "../contracts/query.contract";

//nest generate controller customer
// localhost:3000/v1/customers
// O que eu colocar dentro do Controller vai ser o nome da rota
@Controller('v1/customers')
export class CustomerController {

	constructor(
		private readonly accountService: AccountService,
		private readonly customerService: CustommerService
	) { }

	@Get()
	async getAll() {
		const customers = await this.customerService.findAll();
		return new Result(null, true, customers, null);

	}

	@Get(':document')
	async get(@Param('document') document) {
		const customer = await this.customerService.find(document);
		return new Result(null, true, customer, null);
	}

	@Post('query')
	@UseInterceptors(new ValidatorInterceptor(new QueryContract))
	async query(@Body() model: QueryDto) {
		const customers = await this.customerService.query(model);
		return new Result(null, true, customers, null)
	}

	// @Body para pegar os dados do que vem na requisão
	@Post()
	@UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract))
	async post(@Body() model: CreateCustomerDto) {
		try {
			const password = await Md5.init(`${model.password}${process.env.SALT_KEY}`);
			const user = await this.accountService.create(
				new User(model.document, password, true, ['user']),
			);

			const customer = new Customer(
				model.name, model.document, model.email, null, null, null, null, user);

			const res = await this.customerService.create(customer);

			return new Result('Cliente criado com sucesso!', true, res, null);

		} catch (error) {
			// Rollback manual ex.: this.accountService.remove(user.id)
			throw new HttpException(new Result(
				'Não foi possível realizar seu cadastro', false, null, error),
				HttpStatus.BAD_REQUEST);
		}
	}

	@Post(':document/credit-cards')
	@UseInterceptors(new ValidatorInterceptor(new CreateCreditCardContract()))
	async createCreditCard(@Param('document') document, @Body() model: CreditCard) {
		try {
			await this.customerService.saveOrUpdateCreditCard(document, model);
			return new Result(null, true, model, null);
		} catch (error) {
			throw new HttpException(new Result(
				'Não foi possível adicionar seu cartão de crédito',
				false, null, error),
				HttpStatus.BAD_REQUEST);
		}
	}

	@Put(':document')
	@UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract))
	async update(@Param('document') document, @Body() model: UpdateCustomerDto) {
		try {
			await this.customerService.update(document, model);
			return new Result(null, true, model, null);
		} catch (error) {
			throw new HttpException(new Result(
				'Não foi possível atualizar', false, null, error),
				HttpStatus.BAD_REQUEST)
		}
	}
}