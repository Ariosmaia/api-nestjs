import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { Customer } from "../models/customer.model";
import { Result } from "../models/result.model";

//nest generate controller customer
// localhost:3000/v1/customers
// O que eu colocar dentro do Controller vai ser o nome da rota
@Controller('v1/customers')
export class CustomerController {
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
	post(@Body() body: Customer) {
		return new Result('Cliente criado com sucesso!', true, body, null);
	}

	// @Body para pegar os dados do que vem na requisão
	@Put(':document')
	put(@Param('document') document, @Body() body: Customer) { 
		return new Result('Cliente alterado com sucesso!', true, body, null);
	}

	@Delete(':document')
	delete(@Param('document') document: string) { 
		return new Result('Cliente removido com sucesso!', true, null, null);
	}
}