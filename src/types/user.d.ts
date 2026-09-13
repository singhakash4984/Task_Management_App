export interface User{
    readonly id:string;
    email:string;
    password_hash:string;
    created_at:Date;
    updated_at:Date;
    role:string
}