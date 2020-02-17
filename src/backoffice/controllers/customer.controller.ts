import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors } from "@nestjs/common";
import { Result } from "../models/result.model";
import { ValidatorIntercptor } from "src/interceptors/validator.interceptor";
import { CreateCustomerContract } from "../contracts/customer.contracts";
import { CreateCustomerDto } from "../dtos/create.customer.dto";
import { AccountService } from "../services/account.service";
import { User } from "../models/user.model";

//nest generate controller customer
// localhost:3000/v1/customers
// O que eu colocar dentro do Controller vai ser o nome da rota
@Controller('v1/customers')
export class CustomerController {
	
	constructor(private readonly accountService: AccountService) {}

	@Get()
	get() {
		return new Result(null, true, [], null);
	}

	// Dentro do metodo Http eu defino o parametro da rota
	// Dentro do metodo getById tenho que pegar o parametro do http
	@Get(':document')
	getById(@Param('document') document: string) {
		return new Result(null, true, {}, null);
	}

	// @Body para pegar os dados do que vem na requisão
	@Post()
	@UseInterceptors(new ValidatorIntercptor(new CreateCustomerContract))
	async post(@Body() model: CreateCustomerDto) {
		const user = await this.accountService.create(
			new User(model.document, model.password, true));

		return new Result('Cliente criado com sucesso!', true, user, null);
	}

	// @Body para pegar os dados do que vem na requisão
	@Put(':document')
	put(@Param('document') document, @Body() body) { 
		return new Result('Cliente alterado com sucesso!', true, body, null);
	}

	@Delete(':document')
	delete(@Param('document') document: string) { 
		return new Result('Cliente removido com sucesso!', true, null, null);
	}
}