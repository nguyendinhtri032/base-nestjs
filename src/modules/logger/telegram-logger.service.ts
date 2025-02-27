import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { SERVER_CONFIG } from 'src/configs/server.config'

@Injectable()
export class TelegramLoggerService {
  private readonly botToken = SERVER_CONFIG.TELEGRAM_BOT_TOKEN
  private readonly chatId = SERVER_CONFIG.TELEGRAM_CHAT_ID

  async sendMessage(message: string): Promise<void> {
    const url = SERVER_CONFIG.TELEGRAM_BOT_URL.replace('Token', this.botToken)
    
    await axios.post(url, {
      chat_id: this.chatId,
      text: message,
    })
  }
}
