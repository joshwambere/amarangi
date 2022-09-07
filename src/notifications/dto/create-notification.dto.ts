import { IsNotEmpty, IsString } from "class-validator";

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  creator: string;
  @IsString()
  @IsNotEmpty()
  message: string;
}
