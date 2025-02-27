import {
  BaseEntity as TypeOrmBaseEntity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm'

export abstract class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
