import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { EventsService } from './events.service';
import { Response } from 'express';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

    @Post()
    createEvent(@Body() body: { name: string; capacity: number }) {
        return this.eventsService.createEvent(body.name, body.capacity);
    }

    @Post(':id/book')
    bookSeat(@Param('id') id: string, @Res() res: Response) {
        try {
            const updated = this.eventsService.bookSeat(id);
            return res.status(200).json(updated);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    @Get()
    getAllEvents() {
        return this.eventsService.getAllEvents();
    }
}
