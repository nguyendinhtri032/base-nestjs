import { ApiProperty } from "@nestjs/swagger"

export class PaginationMeta {
    @ApiProperty({ example: 1 })
    totalItems: number

    @ApiProperty({ example: 1 })
    itemCount: number

    @ApiProperty({ example: 100 })
    itemsPerPage: number

    @ApiProperty({ example: 1 })
    totalPages: number

    @ApiProperty({ example: 1 })
    currentPage: number
}