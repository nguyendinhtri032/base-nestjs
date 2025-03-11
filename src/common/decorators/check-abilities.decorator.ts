import { SetMetadata } from '@nestjs/common'
import { Action } from 'src/enums/action'

export const CHECK_ABILITY_KEY = 'abilities'

export const CheckAbilities = (action: Action, subject: any) => {
  return SetMetadata(CHECK_ABILITY_KEY, { action, subject })
}
