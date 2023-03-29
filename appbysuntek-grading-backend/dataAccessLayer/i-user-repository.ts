import { Guid } from "guid-typescript";
import { UserDto } from "../models/user-dto";
import { ResponseDto } from "../models/response-dto";

export interface IUserRepository {
    getMultiple(page: number): Promise<any>;
    verifyLogin(userName: string, password: string): Promise<ResponseDto>;
    isExistUserName(userName: string): Promise<boolean>;
    register(user: UserDto): Promise<ResponseDto>;
    update(id: Guid, user: any): Promise<any>;
    delete(id: Guid): Promise<any>;
}
