import { NestInterceptor, Injectable, ExecutionContext, CallHandler, HttpException, HttpStatus } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Contract } from "src/backoffice/contracts/contract";
import { Result } from "src/backoffice/models/result.model";

@Injectable()
export class ValidatorIntercptor implements NestInterceptor {
	constructor(public contract: Contract) {
	}

	intercept(context: ExecutionContext, next: CallHandler<any>):
		Observable<any> | Promise<Observable<any>> {

		// Pego o contexto, transforma para Http
		// Pegar a requisão do contexto e pega o body
		const body = context.switchToHttp().getRequest().body;
		const valid = this.contract.validate(body);

		if (!valid) {
			throw new HttpException(
				new Result(
					'Ops, algo saiu errado',
					false,
					null,
					this.contract.errors), HttpStatus.BAD_REQUEST);
		}

		return next.handle();
	}


}