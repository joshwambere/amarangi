import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBookingDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  spotId: string;
}
