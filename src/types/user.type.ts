export enum EUserRole {
    ADMIN = 'admin',
    USER = 'user',
    STAFF = 'staff',
    MANAGER = 'manager'
}

export interface IUser {
    _id: string;
    username: string;
    password: string;
    role: string;
    email: string;
    fullName: string;
}