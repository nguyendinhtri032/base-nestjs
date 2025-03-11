import { Column, Entity, Index, JoinColumn, OneToMany } from 'typeorm'
import { BaseEntity } from 'src/common/entities/base.entity'
import { Role } from 'src/enums/role'
@Entity({ name: 'users' })
@Index('fullName_fulltext_index', ['fullName'], { fulltext: true })
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

  @Column({ type: 'enum', nullable: true, enum: Role, default: Role.CLIENT })
  role: Role

  @Column({ nullable: true })
  manageBy: string

  @OneToMany(() => User, (user) => user.manageBy)
  @JoinColumn({ name: 'manageBy', referencedColumnName: 'id' })
  manager: User
}
