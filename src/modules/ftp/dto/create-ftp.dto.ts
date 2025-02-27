import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
export class UploadFileDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The path to the file',
    example: '/uploads',
  })
  path: string
}
