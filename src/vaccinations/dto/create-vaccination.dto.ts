import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateVaccinationDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  @MaxLength(7)
  @ApiProperty()
  code: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  user: string;
}
