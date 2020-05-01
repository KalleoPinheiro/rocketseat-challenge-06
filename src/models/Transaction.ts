import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import TypeTransaction from '../enums/TypeTransactions.enum';
import Category from './Category';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  type: TypeTransaction;

  @Column()
  value: number;

  @Column()
  category_id: string;

  @OneToMany(() => Category, category => category.transaction)
  @JoinColumn({ name: 'category_id' })
  category: Category[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transaction;
