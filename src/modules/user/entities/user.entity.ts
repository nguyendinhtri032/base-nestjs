import { Column, Entity, OneToMany, Unique } from 'typeorm'
import { BaseEntity } from 'src/common/entities/base.entity'
@Entity({ name: 'users' })
export class User extends BaseEntity {

  @Column({ nullable: true })
  fullName: string

  @Column({ unique: true, nullable: true })
  email: string

  @Column({ unique: true, nullable: true })
  phoneNumber: string

  @Column({ nullable: true })
  deviceId: string

  @Column({ nullable: false })
  firebaseUid: string

  @Column({ nullable: true })
  avatar: string

}
