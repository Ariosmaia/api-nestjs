import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { RoomBookedEvent } from '../room-booked.event';

@EventsHandler(RoomBookedEvent)
export class RoomBookedHandler implements IEventHandler<RoomBookedEvent> {
	handle(event: RoomBookedEvent) {
		console.log('RoomBookedEvent:handler - Manipulando o evento Room Booked...');
	}
}