import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards/auth.guard';
import { RoomBookService } from '../services/room-book.service';

@Controller('v1/rooms')
export class AgendaController {
    constructor(private readonly service: RoomBookService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async Book(@Body() body: any) {
			console.log('AppController:Book - Iniciando a requisição');
			await this.service.Book(body.customer, body.room)
    }

}