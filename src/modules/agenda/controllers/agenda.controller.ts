import { Controller, Post, Body, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards/auth.guard';
import { RoomBookService } from '../services/room-book.service';
import { BookRoomDto } from '../dtos/book-room.dto';
import { BookRoomCommand } from '../commands/book-room.command';
import { Result } from 'src/modules/backoffice/models/result.model';

// DTO - dados da tela pra aplicação
// Command - Executa uma ação
// Pode acontecer deles serem iguais as vezes
@Controller('v1/rooms')
export class AgendaController {
    constructor(private readonly service: RoomBookService) { }

		@Post()
		@UseGuards(JwtAuthGuard)
    async Book(@Req() request, @Body() model: BookRoomDto) {
			console.log('AppController:Book - Iniciando a requisição');
			
			try {
				const command = new BookRoomCommand(
					request.user.document, model.roomId, model.date);
					await this.service.Book(command);
			} catch (error) {
				throw new HttpException(new Result(
					'Não foi possível reservar sua sala', false, null, error),
					HttpStatus.BAD_REQUEST);
			}
    }

}