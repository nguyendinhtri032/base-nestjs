import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from 'src/common/entities/base.entity'
import { User } from 'src/modules/user/entities'

@Entity({ name: 'agencies' })
export class Agency extends BaseEntity {
  @Column({ nullable: true })
  name: string

  @Column({ nullable: true })
  address: string

  @Column({ nullable: true })
  phoneNumber: string

  @Column({ nullable: true })
  email: string

  @Column({ nullable: true })
  logo: string

  @Column({ nullable: true })
  description: string

  @OneToMany(() => User, (user) => user.agency)
  users: User[]
}
