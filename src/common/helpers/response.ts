import { HttpStatus } from "@nestjs/common"
import { FastifyReply } from "fastify"

export function ResponseSuccess(
    res: FastifyReply,
    message: string = null,
    data: any = null
) {
    if (data !== null) {
        return res.status(HttpStatus.OK).send({
            data
        })
    }

    return res.status(HttpStatus.OK).send({
        message
    })
}
