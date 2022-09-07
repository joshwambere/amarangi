import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Booking } from "./entities/booking.entity";
import { User } from "../users/entities/user.entity";
import { Spot } from "../spots/entities/spot.entity";
import {Notification} from "../notifications/entities/notification.entity";
import { NotificationsService } from "../notifications/notifications.service";

@Module({
  imports: [TypeOrmModule.forFeature([Booking, User, Spot,Notification])],
  controllers: [BookingsController],
  providers: [BookingsService,NotificationsService]
})
export class BookingsModule {}
