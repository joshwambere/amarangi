import { Module } from "@nestjs/common";
import { SpotsService } from './spots.service';
import { SpotsController } from './spots.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Spot } from "./entities/spot.entity";
import { User } from "../users/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Spot,User])],
  controllers: [SpotsController],
  providers: [SpotsService]
})
export class SpotsModule {}
