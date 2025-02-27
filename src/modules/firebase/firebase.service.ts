import { Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { CreateUserFirebaseDto } from '../auth/dtos/create-user-firebase.dto'
import { MultipleDeviceNotificationDto } from './dto/notifications.dto'
import 'firebase/auth'
import { Provider } from 'src/enums/provider-firebase'

@Injectable()
export class FirebaseService {
  async verifyToken(token: string): Promise<admin.auth.DecodedIdToken> {
    return await admin.auth().verifyIdToken(token)
  }
  async createCustomToken(
    uid: string,
    customClaims?: Record<string, any>,
  ): Promise<string> {
    return await admin.auth().createCustomToken(uid, customClaims || {})
  }
  async createUser(
    userDto: CreateUserFirebaseDto,
  ): Promise<admin.auth.UserRecord> {
    return await admin.auth().createUser(userDto)
  }
  async getUserByPhoneNumber(
    phoneNumber: string,
  ): Promise<admin.auth.UserRecord> {
    try {
      return await admin.auth().getUserByPhoneNumber(phoneNumber)
    } catch {
      return null
    }
  }
  async getUserByEmail(email: string): Promise<admin.auth.UserRecord> {
    try {
      return await admin.auth().getUserByEmail(email)
    } catch {
      return null
    }
  }

  async findOrCreateUser(
    userDto: CreateUserFirebaseDto,
    type: string,
  ): Promise<admin.auth.UserRecord> {
    const { email, phoneNumber } = userDto
    if (type === Provider.EMAIL) {
      const user = await this.getUserByEmail(email)
      if (user) return user
      return await this.createUser(userDto)
    } else if (type === Provider.PHONE_NUMBER) {
      const user = await this.getUserByPhoneNumber(phoneNumber)
      if (user) return user
      return await this.createUser(userDto)
    }
  }
  async sendNotification({ token, title, body }) {
    await admin.messaging().send({
      token,
      notification: {
        title,
        body,
        // icon,
      },
    })
  }
  async sendNotificationToMultipleTokens({
    tokens,
    title,
    body,
    icon,
  }: MultipleDeviceNotificationDto) {
    const message = {
      notification: {
        title,
        body,
        // icon,
      },
      tokens,
    }

    await admin.messaging().sendEachForMulticast(message)
  }
  async deleteAllUser() {
    const users = await admin.auth().listUsers()
    for (const user of users.users) {
      // await admin.auth().deleteUser(user.uid)
    }
    return true
  }
}
