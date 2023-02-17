import { Customer } from "@prisma/client";
import { InMemoryCustomerRepository } from "../../test/repositories/inMemoryCustomerRepository"
import { prisma } from "../../infra/database/prisma";
import { CreateCustomerBody } from "../../infra/http/DTOs/create-user-body";
import { CustomerService } from "./customerService";



describe('Customer service tests', () => {
    it('Should be possible create a new customer and save in the repository', async () => {
        const customerRepository = new InMemoryCustomerRepository();
        const customerService = new CustomerService(customerRepository);
        const dataNewUser: CreateCustomerBody = {
            name: 'Jorge',
            cpf: '04787677063',
            birth: '2000-03-15'
        };
        await customerService.createCustomer(dataNewUser);
        expect(customerRepository.customers).toHaveLength(1);
    })
    it('Should not be possible create a new customer with a cpf that is already in use!', async () => {
        const customerRepository = new InMemoryCustomerRepository();
        const customerService = new CustomerService(customerRepository);
        const dataNewUser: CreateCustomerBody = {
            name: 'Jorge',
            cpf: '04787677063',
            birth: '2000-03-15'
        };
        await customerService.createCustomer(dataNewUser);


        await expect(await customerService.createCustomer(dataNewUser)).rejects.toThrow('The informed cpf is already been used!');

    })
    it('Should have a one customer after had created and saved one', async () => {
        const customerRepository = new InMemoryCustomerRepository();
        const customerService = new CustomerService(customerRepository);
        const dataNewUser: CreateCustomerBody = {
            name: 'Jorge',
            cpf: '04787677063',
            birth: '2000-03-15'
        };
        await customerService.createCustomer(dataNewUser);

        const customers: Customer[] = await customerService.getMany(5, 0);
        expect(customerRepository.customers).toHaveLength(1);
        expect(customers).toHaveLength(1)
    })
    it('Should return a customer that has been registered', async () => {
        const customerRepository = new InMemoryCustomerRepository();
        const customerService = new CustomerService(customerRepository);
        const dataNewUser: CreateCustomerBody = {
            name: 'Jorge',
            cpf: '04787677063',
            birth: '2000-03-15'
        };
        await customerService.createCustomer(dataNewUser);

        const customer: Customer | undefined | null = await customerService.getOne('04787677063');
        expect(customerRepository.customers).toHaveLength(1);
        expect(customer).toBeTruthy();
    })
})