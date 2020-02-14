import { Controller, Get, Post, Put, Delete } from "@nestjs/common";

//nest generate controller customer
// localhost:3000/v1/customers
// O que eu colocar dentro do Controller vai ser o nome da rota
@Controller('v1/customers')
export class CustomerController {
	@Get()
	get() {
		return 'Obter os clientes';
	}

	@Post()
	post() { 
		return 'Criar um cliente'; 
	}

	@Put()
	put() { 
		return 'Atualizar um cliente'; 
	}

	@Delete()
	delete() { 
		return 'Remover um cliente'; 
	}
}