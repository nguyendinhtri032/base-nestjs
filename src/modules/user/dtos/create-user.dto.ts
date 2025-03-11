import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    required: true,
    description: 'The first name of the user',
    example: 'Johny Tri Nguyen',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string

  @ApiProperty({
    required: true,
    description: 'The email address of the user',
    example: 'example@example.com',
  })
  @IsEmail()
  @IsString()
  @IsOptional()
  email: string

  @ApiProperty({
    required: true,
    description: 'The phone number of the user',
    example: '0999999999',
  })
  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{10}$/, { message: 'Phone number must be 10 digits' })
  phoneNumber: string
}
