import { Customer } from "@prisma/client";


export abstract class CustomerRepository {
    abstract create(customer: Customer): Promise<void>;
    abstract find(cpf: string): Promise<Customer | undefined>
    abstract findMany(skip: number, take: number): Promise<Customer[]>
}