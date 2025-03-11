import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { CaslAbilityFactory } from './casl-ability.factory'
import { CHECK_ABILITY_KEY } from 'src/common/decorators/check-abilities.decorator'
import { AppAbility } from './casl-ability.factory'
import { Action } from 'src/enums/action'
import { User } from 'src/modules/user/entities'

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const handler = context.getHandler()
    const requiredAbilities = this.reflector.get<{ action: Action; subject: any }>(
      CHECK_ABILITY_KEY,
      handler,
    )

    if (!requiredAbilities) {
      return true
    }

    const { action, subject } = requiredAbilities

    const user = context.switchToHttp().getRequest().user as User

    const ability: AppAbility = this.caslAbilityFactory.createForUser(user)

    if (!ability.can(action, subject)) {
      throw new ForbiddenException('You do not have permission to perform this action')
    }
    return true
  }
}
