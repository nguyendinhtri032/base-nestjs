import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class VerifyOTPDto {
  @ApiProperty({
    required: true,
    description: 'Phone number of the user',
    example: '0999999999',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string

  @ApiProperty({
    required: true,
    description: 'OTP',
    example: '686868',
  })
  @IsNumber()
  @IsNotEmpty()
  otp: number
}
