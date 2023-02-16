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
        return await this.customerRepository.findMany(page * size, size);
    }



    async getOne(cpf: string) {
        return await this.customerRepository.find(cpfMapper(cpf));
    }


    async createCustomer(data: CreateCustomerBody) {

        const alreadyExist = await this.getOne(cpfMapper(data.cpf));
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