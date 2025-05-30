import { Optional } from "@nestjs/common"
import { ApiProperty, ApiPropertyOptional, PickType } from "@nestjs/swagger"

export class NotificationDto {
  @ApiProperty({
    type: String,
    description: "Client device token",
  })
  token: string

  @ApiProperty({
    type: String,
    description: "Notification Title",
  })
  title: string

  @ApiProperty({
    type: String,
    description: "Notification Body",
  })
  body: string

  @Optional()
  @ApiPropertyOptional({
    type: String,
    description: "Notification Icon / Logo",
  })
  icon: string

  constructor(data: Partial<NotificationDto>) {
    this.token = data.token
    this.title = data.title
    this.body = data.body
    this.icon = data.icon
  }
}


export class MultipleDeviceNotificationDto extends PickType(NotificationDto, [
  "title",
  "body",
  "icon",
]) {
  @ApiProperty({
    type: String,
    description: "Clients device token",
  })
  tokens: string[]

  constructor(data: Partial<MultipleDeviceNotificationDto>) {
    super()
    if (data) {
      this.tokens = data.tokens
      this.title = data.title
      this.body = data.body
      this.icon = data.icon
    }
  }
}

export class TopicNotificationDto extends PickType(NotificationDto, [
  "title",
  "body",
  "icon",
]) {
  @ApiProperty({
    type: String,
    description: "Subscription topic to send to",
  })
  topic: string
}