import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BookingsModule } from './bookings/bookings.module';
import { VaccinationsModule } from './vaccinations/vaccinations.module';
import { SpotsModule } from './spots/spots.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [AuthModule, BookingsModule, VaccinationsModule, SpotsModule, NotificationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
