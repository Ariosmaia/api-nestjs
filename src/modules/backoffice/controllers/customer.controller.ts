import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, HttpException, HttpStatus } from "@nestjs/common";
import { Result } from "../models/result.model";
import { ValidatorIntercptor } from "src/interceptors/validator.interceptor";
import { CreateCustomerContract } from "../contracts/customer/create-customer.contract";
import { CreateCustomerDto } from "../dtos/create-customer.dto";
import { AccountService } from "../services/account.service";
import { User } from "../models/user.model";
import { CustommerService } from "../services/customer.service";
import { Customer } from "../models/customer.model";
import { CreatePetContract } from "../contracts/pet/create-pet.contract";
import { Pet } from "../models/pet.model";
import { QueryDto } from "../dtos/query.dto";

//nest generate controller customer
// localhost:3000/v1/customers
// O que eu colocar dentro do Controller vai ser o nome da rota
@Controller('v1/customers')
export class CustomerController {
	
	constructor(
		private readonly accountService: AccountService,
		private readonly customerService: CustommerService
		) {}

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

	@Get()
	async getAll(){
		const customers =  await this.customerService.findAll();
		return new Result(null, true, customers, null);

	}

	@Get(':document')
	async get(@Param('document') document){
		const customer =  await this.customerService.find(document);
		return new Result(null, true, customer, null);
	}

	@Post('query')
	async query(@Body() model: QueryDto) {
		const customers =  await this.customerService.query(model);
		return new Result(null, true, customers, null)
	}

}