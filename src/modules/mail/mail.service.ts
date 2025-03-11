import { Injectable, Logger } from '@nestjs/common'
import * as nodemailer from 'nodemailer'
import { SERVER_CONFIG } from 'src/configs/server.config'
@Injectable()
export class MailService {
  private transporter
  private readonly logger = new Logger(MailService.name)
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: SERVER_CONFIG.SMTP.USER,
        pass: SERVER_CONFIG.SMTP.PASSWORD,
      },
    })
  }
  async sendEmail(to: string, subject: string, text: string, html: string) {
    const mailOptions = {
      from: SERVER_CONFIG.SMTP.USER,
      to,
      subject,
      text,
      html,
    }

    const info = await this.transporter.sendMail(mailOptions)
  }
}
