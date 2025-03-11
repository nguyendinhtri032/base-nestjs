import { IsString, IsBoolean, IsOptional, IsEmail, IsPhoneNumber } from 'class-validator'

export class CreateUserFirebaseDto {
    @IsOptional()
    @IsEmail()
    email?: string

    @IsBoolean()
    emailVerified: boolean

    @IsOptional()
    @IsPhoneNumber(null)
    phoneNumber?: string

    @IsOptional()
    @IsString()
    password?: string

    @IsOptional()
    @IsString()
    displayName?: string

    @IsOptional()
    @IsString()
    photoURL?: string

    @IsBoolean()
    disabled: boolean

    constructor(data: Partial<CreateUserFirebaseDto>) {
        this.email = data.email
        this.emailVerified = data.emailVerified
        this.phoneNumber = data.phoneNumber
        this.password = data.password
        this.displayName = data.displayName
        this.photoURL = data.photoURL
        this.disabled = data.disabled ?? false
    }
}
