import { LoggerService } from '@nestjs/common';

export class CustomLogger implements LoggerService {
	log(message: any) {
		console.log(message)
	}	
	
	error(message: any, trace: string) {
		console.log(message)
	}

	warn(message: any) {
		console.log(message)
	}

	debug(message: any) {
		console.log(message)
	}
	verbose(message: any) {
		console.log(message)
	}
}