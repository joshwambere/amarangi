import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NotificationStatus } from "./enums/notification.status.enum";
import {Notification} from "./entities/notification.entity";

@Injectable()
export class NotificationsService {
  constructor(@InjectRepository(Notification) private readonly notificationRepo:Repository<Notification>){}

  async create(createNotificationDto: CreateNotificationDto) {
    const message = `user ${createNotificationDto.creator} ${createNotificationDto.message}`;
    const notification = await this.notificationRepo.create({ message })
    return await this.notificationRepo.save(notification);
  }

  async findAll() {
    return await this.notificationRepo.find();
  }

  async findOne(id: string) {
    const notification = await this.notificationRepo.findOne({ where: { id } });
    if (!notification) throw new Error('Notification not found');
    return notification;
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    const notification = await this.notificationRepo.findOne({ where: { id } });
    if (!notification) throw new Error('Notification not found');
    return await this.notificationRepo.save({ ...notification, ...updateNotificationDto });
  }

  async readAll(){
    const updated = await this.notificationRepo.update({ status: NotificationStatus.UNREAD }, { status: NotificationStatus.READ });
    if (updated.affected > 0) return await this.findAll();
  }
}
