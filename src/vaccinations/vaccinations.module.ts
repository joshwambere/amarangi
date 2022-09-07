import { Module } from '@nestjs/common';
import { VaccinationsService } from './vaccinations.service';
import { VaccinationsController } from './vaccinations.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Vaccination } from "./entities/vaccination.entity";
import { User } from "../users/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Vaccination,User])],
  controllers: [VaccinationsController],
  providers: [VaccinationsService]
})
export class VaccinationsModule {}
