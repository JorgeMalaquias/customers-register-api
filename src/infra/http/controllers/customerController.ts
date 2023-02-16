import { Request, Response } from "express";
import { CustomerRepository } from "../../../application/repositories/customerRepository";
import { CustomerService } from "../../../application/services/customerService";
import { PrismaCustomerRepository } from "../../database/repositories/prismaCustomerRepository";

export class CustomerController {

    private static customerService: CustomerService;
    private static customerRepository: CustomerRepository;
    constructor() {
        CustomerController.customerRepository = new PrismaCustomerRepository();
        CustomerController.customerService = new CustomerService(CustomerController.customerRepository);
    }

    async getCustomerWithPagination(req: Request, res: Response) {
        const { size, page } = req.query;
        const customers = await CustomerController.customerService.getMany(Number(size), Number(page));
        if (customers.length === 0) {
            res.send('There are no customers registered or the page informed does not exist!')
        }
        res.send(customers);
    }
    async getCustomerByCpf(req: Request, res: Response) {
        const { cpf } = req.params;
        const customer = await CustomerController.customerService.getOne(cpf);
        res.send(customer);
    }
    async createCustomer(req: Request, res: Response) {
        const customer = await CustomerController.customerService.createCustomer(req.body);
        res.status(201).send(customer);
    }



}

