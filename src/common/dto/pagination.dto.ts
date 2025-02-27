import { IsNumber } from "class-validator"
import { IsOptional } from "class-validator"
import { Type } from "class-transformer"
import { Max } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class PaginationDto {
    @ApiProperty({
        description: 'The page number',
        example: 1,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    page?: number

    @ApiProperty({
        description: 'The number of items per page',
        example: 10,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    @Max(100)
    perPage?: number
}