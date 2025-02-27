import { ApiProperty } from '@nestjs/swagger'

export class UserDto {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  id: string

  @ApiProperty({
    description: 'The full name of the user',
    example: 'Johny Tri Nguyen',
  })
  fullName: string

  @ApiProperty({
    description: 'The phone number of the user',
    example: '0999999999',
  })
  phoneNumber: string

  @ApiProperty({
    description: 'The email address of the user',
    example: 'example@example.com',
  })
  email: string

  @ApiProperty({
    description: 'The referral code of the user',
    example: '123456',
  })
  firebaseUid: string

  @ApiProperty({
    description: 'The device id of the user',
    example: '123456',
  })
  deviceId: string

  @ApiProperty({
    description: 'The avatar of the user',
    example: 'https://example.com/avatar.jpg',
  })
  avatar: string
}
