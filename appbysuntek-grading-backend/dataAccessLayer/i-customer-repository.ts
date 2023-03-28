import { Guid } from "guid-typescript";
import { CustomerDto } from "../models/customer-dto";
import { ResponseDto } from "../models/response-dto";

export interface ICustomerRepository {
    getMultiple(page: number): Promise<any>;
    verifyLogin(userName: string, password: string): Promise<ResponseDto>;
    isExistUserName(userName: string): Promise<boolean>;
    register(customer: CustomerDto): Promise<ResponseDto>;
    update(id: Guid, customer: any): Promise<any>;
    delete(id: Guid): Promise<any>;
}
