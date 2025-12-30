import { UUID } from "crypto";

export interface UserCredentials {
    username: string;
    password: string;
    email: string;
    phone_number: number;
}
