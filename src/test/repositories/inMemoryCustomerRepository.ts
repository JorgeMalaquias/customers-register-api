import { Customer } from "@prisma/client";
import { CustomerRepository } from "../../application/repositories/customerRepository";
import { Replace } from "../../helpers/replace";

export class InMemoryCustomerRepository implements CustomerRepository {
    public customers: Customer[] = [];

    async create(customer: Replace<Customer, { id?: number }>): Promise<void> {
        this.customers.push({ ...customer, id: this.customers.length });
    }
    async find(cpf: string): Promise<Customer | undefined | null> {
        const result = this.customers.find((e) => e.cpf === cpf);
        console.log(result);
        return result;
    }
    async findMany(skip: number, take: number): Promise<Customer[]> {
        return this.customers.slice(0, skip + take);
    }
    async count(): Promise<number> {
        return this.customers.length;
    }
}