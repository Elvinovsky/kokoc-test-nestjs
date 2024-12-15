import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @CreateDateColumn({ precision: 6 })
  createdAt: Date;

  @UpdateDateColumn({ precision: 6, nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ precision: 6, nullable: true })
  deletedAt: Date;
}
