import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { NotificationStatus } from "../enums/notification.status.enum";

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id:string;
  @Column({type:'varchar', nullable:false})
  message: string
  @Column({type:'varchar', nullable:false, default:NotificationStatus.UNREAD})
  status: NotificationStatus
  @CreateDateColumn({
    type: 'timestamptz',
    onUpdate: 'NOW()',
  })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamptz',
    onUpdate: 'NOW()',
  })
  updatedAt: Date;
}
