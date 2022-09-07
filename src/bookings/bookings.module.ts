import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Booking } from "./entities/booking.entity";
import { User } from "../users/entities/user.entity";
import { Spot } from "../spots/entities/spot.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Booking, User, Spot])],
  controllers: [BookingsController],
  providers: [BookingsService]
})
export class BookingsModule {}
