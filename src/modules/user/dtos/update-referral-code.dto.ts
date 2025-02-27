import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class UpdateReferralCodeDto {
  @ApiProperty({
    required: true,
    description: 'The referral code of the user',
    example: '686868',
  })
  @IsOptional()
  @IsString()
  referralCode: string
}
