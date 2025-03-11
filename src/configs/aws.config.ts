import { S3 } from "aws-sdk"
import { SERVER_CONFIG } from "./server.config"

export const AwsConfig = {
    defaultServiceOptions: {
        useValue: {
            region: SERVER_CONFIG.AWS.REGION,
            credentials: {
                accessKeyId: SERVER_CONFIG.AWS.ACCESS_KEY_ID,
                secretAccessKey: SERVER_CONFIG.AWS.SECRET_ACCESS_KEY,
            },
        },
    },
    services: [S3],
}
