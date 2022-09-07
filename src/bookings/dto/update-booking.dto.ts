import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingDto } from './create-booking.dto';
import { IsNotEmpty, IsString } from "class-validator";
import { SpotStatus } from "../../shared/enums/spot.status.enum";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateBookingDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  status: SpotStatus;
}
