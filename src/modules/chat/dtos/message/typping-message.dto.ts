import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class TypingMessageDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  roomId: string
}
