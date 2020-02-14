import { Contract } from "./contract";
import { Customer } from "../models/customer.model";
import { Flunt } from "src/utils/flunt";

export class CreateCustomerContract implements Contract{
	errors: any[];	
	
	validate(model: Customer): boolean {
		const flunt = new Flunt();

		flunt.hasMinLen(model.name, 5, 'Nome inválido');
		flunt.isEmail(model.email, 'E-mail inválido');
		flunt.isFixedLen(model.document, 11, 'CPF inválido');
		flunt.hasMinLen(model.password, 6, 'Senha inválida');
		flunt.hasMinLen(model.name, 5, 'Nome inválido');

		// this.errors.push({}); // return this.errors.lenth === 0;

		this.errors = flunt.errors;
		return flunt.isValid();
	}

}