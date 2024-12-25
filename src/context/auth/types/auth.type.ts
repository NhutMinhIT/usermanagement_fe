import { IUser } from "../../../types/user.type";

export interface ILoginResponse {
    user: IUser;
    access_token: string;
    message: string;
}
