import { IUser } from "../../../types/userType";

export interface ILoginResponse {
    user: IUser;
    access_token: string;
    message: string;
}
