import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSpotDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty()
  name: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty()
  description: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  location: string;
  @IsOptional()
  @ApiProperty()
  images: string[];
}
