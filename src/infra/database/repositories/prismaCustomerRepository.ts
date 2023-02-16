import { Customer } from "@prisma/client";
import { CustomerRepository } from "../../../application/repositories/customerRepository";
import { Replace } from "../../../helpers/replace";
import { prisma } from "../prisma";

export class PrismaCustomerRepository implements CustomerRepository {

    async create(customer: Replace<Customer, { id?: number | undefined; }>): Promise<void> {
        await prisma.customer.create({
            data: {
                name: customer.name,
                cpf: customer.cpf,
                birth: customer.birth
            }
        })
    }
    async find(cpf: string): Promise<Customer | undefined | null> {
        return await prisma.customer.findUnique({
            where: {
                cpf
            }
        })
    }
    async findMany(skip: number, take: number): Promise<Customer[]> {
        return await prisma.customer.findMany({
            skip,
            take
        })
    }
}