import { AggregateRoot } from '@nestjs/cqrs';
import { RoomBookedEvent } from '../events/room-booked.event';

// AggregateRoot - Agregado raiz da aplicação
export class Room extends AggregateRoot {
	constructor(private readonly id: string){
		super();
	}

	book(customerId: string, date: Date){
		// Regras de negócio
		// Dispara os eventos
		this.apply(new RoomBookedEvent(customerId, this.id));
	}
}