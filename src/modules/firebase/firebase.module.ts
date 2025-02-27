import { Module, Global } from '@nestjs/common'
import * as admin from 'firebase-admin'
import path from 'path'

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
  ],
  exports: ['FIREBASE_APP'],
  
})
export class FirebaseModule {}
