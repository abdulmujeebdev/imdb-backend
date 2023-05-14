
export class UserDto {
    public first_name: string;
    public last_name: string;
    public email: string;
    public password: string;
    public phone: number;
    public created_at: Date;
    public updated_at: Date;
}

export class UserGetDto {
    public first_name: string;
    public last_name: string;
    public email: string;
    public phone: number;
}

export class UserLoginDto {
    public email: string;
    public password: string;
}
