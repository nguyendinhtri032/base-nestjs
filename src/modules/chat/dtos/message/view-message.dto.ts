import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class ViewMessageDto {

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  roomId: string

  @ApiProperty({ required: true })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  messageId: string
}
