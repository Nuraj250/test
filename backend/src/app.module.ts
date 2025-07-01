import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsController } from './events/events.controller';
import { EventsService } from './events/events.service';

@Module({
  imports: [],
  controllers: [EventsController],
  providers: [EventsService],
})
export class AppModule {}
