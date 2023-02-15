import { Customer } from "@prisma/client";
import { CustomerEntity } from "../entities/customer";


export abstract class CustomerRepository {
    abstract create(customer: Customer): Promise<void>;
    abstract find(): Promise<Customer>
    abstract findMany(skip: number, take: number): Promise<Customer[]>
}