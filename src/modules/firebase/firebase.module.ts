import { Module, Global } from '@nestjs/common'
import * as admin from 'firebase-admin'
import path from 'path'
import { FirebaseService } from './firebase.service'

@Global()
@Module({
  providers: [
    {
      provide: 'FIREBASE_APP',
      useFactory: () => {
        return admin.initializeApp({
          credential: admin.credential.cert(path.resolve(__dirname, '../../../serviceAccount.json')),
        })
      },
    },
    FirebaseService
  ],
  exports: ['FIREBASE_APP'],
  
})
export class FirebaseModule {}
