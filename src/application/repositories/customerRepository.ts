import { Customer } from "@prisma/client";
import { Replace } from "../../helpers/replace";


export abstract class CustomerRepository {
    abstract create(customer: Replace<Customer, { id?: number }>): Promise<void>;
    abstract find(cpf: string): Promise<Customer | undefined | null>
    abstract findMany(skip: number, take: number): Promise<Customer[]>
}