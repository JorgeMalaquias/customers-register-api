import { Customer } from "@prisma/client";
import { CustomerRepository } from "../../src/application/repositories/customerRepository";
import { Replace } from "../../src/helpers/replace";

export class InMemoryCustomerRepository implements CustomerRepository {
    public customers: Customer[] = [];

    async create(customer: Replace<Customer, { id?: number }>): Promise<void> {
        this.customers.push({ ...customer, id: Math.floor(Math.random()) });
    }
    async find(cpf: string): Promise<Customer | undefined | null> {
        return this.customers.find((e) => e.cpf === cpf);
    }
    async findMany(skip: number, take: number): Promise<Customer[]> {
        return this.customers.slice(0, skip + take);
    }
}