import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";

//nest generate controller customer
// localhost:3000/v1/customers
// O que eu colocar dentro do Controller vai ser o nome da rota
@Controller('v1/customers')
export class CustomerController {
	@Get()
	get() {
		return 'Obter os clientes';
	}

	// Dentro do metodo Http eu defino o parametro da rota
	// Dentro do metodo getById tenho que pegar o parametro do http
	@Get(':document')
	getById(@Param('document') document) {
		return 'Obter o cliente ' + document;
	}

	// @Body para pegar os dados do que vem na requisão
	@Post()
	post(@Body() body) { 
		return body; 
	}

	// @Body para pegar os dados do que vem na requisão
	@Put(':document')
	put(@Param('document') document, @Body() body) { 
		return {
			customer: document,
			data: body,
		}; 
	}

	@Delete(':document')
	delete() { 
		return 'Remover um cliente'; 
	}
}