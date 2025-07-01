import { Injectable } from '@nestjs/common';
import { Event } from './event.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EventsService {
    private events: Event[] = [];

    createEvent(name: string, capacity: number): Event {
        const event: Event = {
            id: uuidv4(),
            name,
            capacity,
            booked: 0,
        };
        this.events.push(event);
        return event;
    }

    bookSeat(id: string): Event {
        const event = this.events.find(e => e.id === id);
        if (!event) throw new Error('Event not found');
        if (event.booked >= event.capacity) throw new Error('Event fully booked');
        event.booked += 1;
        return event;
    }

    getAllEvents(): Event[] {
        return this.events;
    }
}
