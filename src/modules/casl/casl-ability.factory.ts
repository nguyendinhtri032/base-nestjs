import { AbilityClass } from "@casl/ability"
import { AbilityBuilder } from "@casl/ability"
import { Ability } from "@casl/ability"
import { InferSubjects, ExtractSubjectType } from "@casl/ability"
import { Action } from "src/enums/action"
import { Injectable } from "@nestjs/common"
import { User } from "../user/entities"
import { Role } from "src/enums/role"

type Subjects = InferSubjects<typeof User> | 'all'

export type AppAbility = Ability<[Action, Subjects]>

@Injectable()
export class CaslAbilityFactory {
    createForUser(user: User) {
        const { can, cannot, build } = new AbilityBuilder<
            Ability<[Action, Subjects]>
        >(Ability as AbilityClass<AppAbility>)

        if (user.role === Role.ADMIN) {
            can(Action.Manage, 'all')
        } else if (user.role === Role.MANAGER) {
            can(Action.Read, User)
        } else {
            can(Action.Read, User)
        }

        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<Subjects>,
        })
    }
}
