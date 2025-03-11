import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { QueueService } from '../queue/queue.service'

@Injectable()
export class UserEventHandler {
  constructor(private readonly queueService: QueueService) { }
  @OnEvent('user.search')
  handleUserSearchEvent(payload: { search: string }) {
    const data = { to: 'nguyendinhtri032@gmail.com', subject: 'Test', text: `User search: ${payload.search}`, html: '<p>Test</p>' }
    this.queueService.sendMailToQueue(data)
    console.log('send ok')
  }
}
