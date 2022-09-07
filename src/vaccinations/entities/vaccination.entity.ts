import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { VaccinationStatus } from "../enums/vaccination.status.enum";

@Entity('vaccinations')
export class Vaccination {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false, unique: true, type: 'varchar' })
  code: string;
  @Column({ nullable: false, type: 'varchar', name: 'user' })
  userId: string;
  @OneToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user' })
  user: User;
  @Column({ nullable: false, type: 'varchar', default: VaccinationStatus.FULL })
  status: VaccinationStatus;
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
