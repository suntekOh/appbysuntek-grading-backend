import { Guid } from "guid-typescript";

export interface ICustomerRepository {
    getMultiple(page: number): Promise<any>;
    validateCustomer(userName: string, password: string): Promise<any>;
    create(customer: any): Promise<any>;
    update(id: Guid, customer: any): Promise<any>;
    delete(id: Guid): Promise<any>;
}
