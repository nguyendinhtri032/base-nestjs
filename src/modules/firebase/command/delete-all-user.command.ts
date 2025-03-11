import { Command, CommandRunner } from 'nest-commander'
import { FirebaseService } from '../firebase.service'
import { Logger } from '@nestjs/common'

@Command({
  name: 'delete-all-user',
  description: 'Xóa tất cả người dùng trong Firebase',
})
export class DeleteAllUserCommand extends CommandRunner {
  private readonly logger = new Logger(DeleteAllUserCommand.name)

  constructor(private readonly firebaseService: FirebaseService) {
    super()
  }

  async run(): Promise<void> {
    this.logger.log('Bắt đầu xóa tất cả người dùng Firebase...')
    try {
      await this.firebaseService.deleteAllUserFirebase()
      this.logger.log('Tất cả người dùng Firebase đã được xóa thành công.')
      process.exit(0)
    } catch (error) {
      this.logger.error('Đã xảy ra lỗi khi xóa người dùng Firebase:', error)
      process.exit(1)
    }
  }
}