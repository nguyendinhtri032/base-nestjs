import { Processor, Process } from '@nestjs/bull'
import { Job } from 'bull'
import { MailService } from '../mail/mail.service'
@Processor('taskQueue')
export class QueueProcessor {
  constructor(
    private readonly mailService: MailService,
  ) {}

  @Process('sendMail')
  async handleSendMail(job: Job) {
    const { to, subject, text, html } = job.data
    await this.mailService.sendEmail(to, subject, text, html)
  }
}
