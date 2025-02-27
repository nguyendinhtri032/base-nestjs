import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class UpdateDeviceIdDto {
  @ApiProperty({
    required: false,
    description: 'The device id of the user',
    example: '1234567890',
  })
  @IsString()
  @IsOptional()
  deviceId: string
}
