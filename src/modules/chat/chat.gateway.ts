import { Logger, UseFilters } from '@nestjs/common'
import { FirebaseService } from '../firebase/firebase.service' 
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsException,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { UserPayload } from 'src/types/user-payload.type'
import { RedisService } from '../redis/redis.service'
import { UserService } from '../user/user.service'
import { HandleExceptionWsFilter } from 'src/exception/handle-exception-ws.filter'

@UseFilters(HandleExceptionWsFilter)
@WebSocketGateway(Number(process.env.WS_PORT) || 4800, { cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server
  private readonly logger = new Logger('ChatGateway')
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly redisService: RedisService,
    private readonly userService: UserService,
  ) { }

  async onModuleInit(): Promise<void> {
    this.logger.log('ChatGateway initialized')
    // await this.connectedUserService.deleteAll()
  }

  async handleConnection(socket: Socket): Promise<void> {
      const user = await this.authenticateSocket(socket)
      socket.data.user_id = user.id
      let socketIds = await this.redisService.getData(`user_${user.id}`)

      if (!socketIds) {
        socketIds = []
      }
      socketIds.push(socket.id)
      await this.redisService.setData(`user_${user.id}`, socketIds)
  }

  async handleDisconnect(socket: Socket): Promise<void> {
    const userId = socket.data.userId
    await this.redisService.delData(`user_${userId}`)
  }

  private async emitToSocket(
    socketId: string,
    event: string,
    payload: any,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server.to(socketId).emit(event, payload, (response: any) => {
        if (response && response.error) {
          reject(new Error(response.error))
        } else {
          resolve()
        }
      })
    })
  }

  // private async notifyRoomParticipants(
  //   participants: User[],
  //   event: string,
  //   payload: any,
  // ): Promise<void> {
  //   const notificationPromises = participants.flatMap((participant) =>
  //     participant.connectedUsers.map(({ socket_id }) => ({
  //       socket_id,
  //       promise: this.emitToSocket(socket_id, event, payload),
  //     })),
  //   )

  //   const results = await Promise.allSettled(
  //     notificationPromises.map((np) => np.promise),
  //   )

  //   results.forEach((result, index) => {
  //     const { socket_id } = notificationPromises[index]
  //     if (result.status === 'fulfilled') {
  //       this.logger.log(
  //         `Notification sent successfully to Socket ID ${socket_id} for event '${event}'`,
  //       )
  //     } else if (result.status === 'rejected') {
  //       this.logger.error(
  //         `Failed to notify Socket ID ${socket_id} for event '${event}': ${result.reason}`,
  //       )
  //     }
  //   })
  // }

  private async authenticateSocket(socket: Socket): Promise<UserPayload> {
    const token = this.extractJwtToken(socket)
    const decodedToken = await this.firebaseService.verifyToken(token)
    return await this.userService.getUserByUid(decodedToken.uid)
  }

  private extractJwtToken(socket: Socket): string {
    const authHeader = socket.handshake.headers.authorization
      if (!authHeader)
        throw new WsException('No authorization header found')

      const [bearer, token] = authHeader.split(' ')
      if (bearer !== 'Bearer' || !token)
        throw new WsException('Invalid or missing token')

      return token
    }
}
