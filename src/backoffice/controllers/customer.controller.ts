import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, HttpException, HttpStatus } from "@nestjs/common";
import { Result } from "../models/result.model";
import { ValidatorIntercptor } from "src/interceptors/validator.interceptor";
import { CreateCustomerContract } from "../contracts/customer/create-customer.contract";
import { CreateCustomerDto } from "../dtos/create.customer.dto";
import { AccountService } from "../services/account.service";
import { User } from "../models/user.model";
import { CustommertService } from "../services/customer.service";
import { Customer } from "../models/customer.model";
import { Address } from "../models/address.model";
import { CreateAddressContract } from "../contracts/address/create-address.contract";
import { CreatePetContract } from "../contracts/pet/create-pet.contract";
import { Pet } from "../models/pet.model";

//nest generate controller customer
// localhost:3000/v1/customers
// O que eu colocar dentro do Controller vai ser o nome da rota
@Controller('v1/customers')
export class CustomerController {
	
	constructor(
		private readonly accountService: AccountService,
		private readonly customerService: CustommertService
		) {}

	@Get()
	get() {
		return new Result(null, true, [], null);
	}

	// Dentro do metodo Http eu defino o parametro da rota
	// Dentro do metodo getById tenho que pegar o parametro do http
	@Get(':document')
	getById(@Param('document') document: string) {
		return new Result(null, true, document, null);
	}

	// @Body para pegar os dados do que vem na requisão
	@Post()
	@UseInterceptors(new ValidatorIntercptor(new CreateCustomerContract))
	async post(@Body() model: CreateCustomerDto) {
			try {
			const user = await this.accountService.create(
				new User(model.document, model.password, true),
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

	@Post(':document/addresses/billing')
	@UseInterceptors(new ValidatorIntercptor(new CreateAddressContract))
	async addBillingAddress(@Param('document') document, @Body() model: Address){
		try {
			await this.customerService.addBillingAddress(document, model);
			return new Result(null, true, model, null);
		} catch (error) {
			throw new HttpException(new Result(
				'Não foi possível adicionar seu endereço', false, null, error), 
				HttpStatus.BAD_REQUEST)
		}
	}

	
	@Post(':document/addresses/shipping')
	@UseInterceptors(new ValidatorIntercptor(new CreateAddressContract))
	async addShippingAddress(@Param('document') document, @Body() model: Address){
		try {
			await this.customerService.addShippingAddress(document, model);
			return new Result(null, true, model, null);
		} catch (error) {
			throw new HttpException(new Result(
				'Não foi possível adicionar seu endereço', false, null, error), 
				HttpStatus.BAD_REQUEST)
		}
	}

	@Post(':document/pets')
	@UseInterceptors(new ValidatorIntercptor(new CreatePetContract))
	async createPet(@Param('document') document, @Body() model: Pet){
		try {
			await this.customerService.createPet(document, model);
			return new Result(null, true, model, null);
		} catch (error) {
			throw new HttpException(new Result(
				'Não foi possível criar seu pet', false, null, error), 
				HttpStatus.BAD_REQUEST)
		}
	}

	@Put(':document/pets/:id')
	@UseInterceptors(new ValidatorIntercptor(new CreatePetContract))
	async updatePet(@Param('document') document, @Param('id') id: string, @Body() model: Pet){
		try {
			await this.customerService.updatePet(document, id, model);
			return new Result(null, true, model, null);
		} catch (error) {
			throw new HttpException(new Result(
				'Não foi possível atualizar seu pet', false, null, error), 
				HttpStatus.BAD_REQUEST)
		}
	}

	// @Body para pegar os dados do que vem na requisão
	@Put(':document')
	put(@Param('document') document, @Body() body) { 
		return new Result('Cliente alterado com sucesso!', true, body, null);
	}

	@Delete(':document')
	delete(@Param('document') document: string) { 
		return new Result('Cliente removido com sucesso!', true, document, null);
	}
}