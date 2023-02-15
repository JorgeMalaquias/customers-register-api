import { Request, Response } from "express";
import { CustomerService } from "../../../application/services/customerService";

export class CustomerController {

    private static customerService: CustomerService;

    constructor() {
        CustomerController.customerService = new CustomerService();
    }

    async getCustomerWithPagination(req: Request, res: Response) {
        const { size, page } = req.query;
        const customers = await CustomerController.customerService.getMany(Number(size), Number(page));
        res.send(customers);
    }
    async getCustomerByCpf(req: Request, res: Response) {
        const { cpf } = req.params;
        const customer = await CustomerController.customerService.getOne(cpf);
        res.send(customer);
    }
    async createCustomer(req: Request, res: Response) {
        const customer = await CustomerController.customerService.createCustomer(req.body);
        res.send(customer);
    }



}

