import { IUser } from "../../../types/UserType";

export interface ILoginResponse {
    user: IUser;
    access_token: string;
    message: string;
}
