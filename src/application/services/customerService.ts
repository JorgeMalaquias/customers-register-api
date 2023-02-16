import { CreateCustomerBody } from "../../infra/http/DTOs/create-user-body";
import { Cpf } from "../entities/cpf";
import { CustomerEntity } from "../entities/customer";
import { cpfMapper } from "../mappers/customerRepositoryMapper";
import { CustomerRepository } from "../repositories/customerRepository"

export class CustomerService {

    private customerRepository: CustomerRepository;

    constructor(customerRepository: CustomerRepository) {
        this.customerRepository = customerRepository;
    }


    async getMany(size: number, page: number): Promise<any> {
        await this.paginationValidation(size * page);
        return await this.customerRepository.findMany(page * size, size);
    }

    async paginationValidation(skip: number): Promise<void> {
        const n = await this.customerRepository.count();
        if (n !== 0 && skip > n) {
            throw ({ type: 'bad_request', message: 'The informed page does not exist because there are no customers enough!' });
        }
    }

    async getOne(cpf: string) {
        const customer = await this.customerRepository.find(cpfMapper(cpf));
        if (customer === null || customer === undefined) {
            throw ({ type: 'not_found', message: 'There is no customer registered with the informed cpf!' });
        }
        return customer;
    }


    async createCustomer(data: CreateCustomerBody) {

        const alreadyExist = await this.customerRepository.find(cpfMapper(data.cpf));
        if (alreadyExist !== null && alreadyExist !== undefined) {
            throw ({ type: 'conflict', message: 'The informed cpf is already been used!' });
        }
        const newCustomer = new CustomerEntity({
            cpf: new Cpf(cpfMapper(data.cpf)),
            name: data.name,
            birth: new Date(data.birth)
        });
        await this.customerRepository.create({
            name: newCustomer.name,
            cpf: newCustomer.cpf.value,
            birth: newCustomer.birth
        })
    }
}