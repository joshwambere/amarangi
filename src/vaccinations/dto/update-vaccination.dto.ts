import { VaccinationStatus } from "../enums/vaccination.status.enum";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateVaccinationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  status: VaccinationStatus;
}
