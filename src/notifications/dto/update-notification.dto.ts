import { IsNotEmpty, IsString } from "class-validator";
import { NotificationStatus } from "../enums/notification.status.enum";

export class UpdateNotificationDto  {
  @IsNotEmpty()
  @IsString()
  status: NotificationStatus;
}
