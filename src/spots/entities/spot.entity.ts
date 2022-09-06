import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SpotStatus } from "../../shared/enums/spot.status.enum";

@Entity('spots')
export class Spot {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false, unique: false, type: 'varchar' })
  name: string;
  @Column({ nullable: false, unique: false, type: 'varchar' })
  description: string;
  @Column({ nullable: false, unique: false, type: 'varchar' })
  location: string;
  @Column({ nullable: true, unique: false, type: 'varchar' })
  images: string[];
  @Column({ nullable: false, unique: false, type: 'varchar',default: SpotStatus.AVAILABLE })
  status:SpotStatus;
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
