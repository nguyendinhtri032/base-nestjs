import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginPhoneDto {
  @ApiProperty({
    required: true,
    description: 'phoneNumber the user',
    example: '0999999999',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string
}
