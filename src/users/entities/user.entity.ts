import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { RoleType } from "../../shared/enums/user.role.enum";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false, unique: true, type: 'varchar' })
  email: string;
  @Column({ type: 'varchar' })
  password: string;
  @Column({ nullable: true, unique: false, type: 'varchar' })
  refreshToken: string;
  @Column({ nullable: true, unique: false, type: 'varchar' })
  accessToken: string;
  @Column({ nullable: false, type: 'varchar',default: RoleType.USER  })
  role: RoleType;
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
