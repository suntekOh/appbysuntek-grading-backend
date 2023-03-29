import { Guid } from "guid-typescript";

export interface UserDto {
    id?: Guid;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    created_user?: string;
    isActive?: boolean;
}