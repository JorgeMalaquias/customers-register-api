import { Customer } from "@prisma/client";
import { CustomerRepository } from "../../src/application/repositories/customerRepository";

export class InMemoryCustomerRepository implements CustomerRepository {
    public customers: Customer[] = [];

    async create(customer: Customer): Promise<void> {
        this.customers.push;
    }
    async find(cpf: string): Promise<Customer | undefined> {
        return this.customers.find((e) => e.cpf === cpf);
    }
    async findMany(skip: number, take: number): Promise<Customer[]> {
        return this.customers.slice(0, skip + take);
    }
}