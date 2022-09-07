import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Spot } from "../../spots/entities/spot.entity";

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id:string
  @Column({nullable: false,type:'varchar', name:'user'})
  userId:string
  @ManyToOne(() => User, user => user.id)
  @JoinColumn({name: 'user'})
  user:User
  @Column({nullable: false,type:'varchar', name:'spot'})
  spotId:string
  @ManyToOne(() => Spot, spot => spot.id)
  @JoinColumn({name: 'spot'})
  spot:Spot
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
