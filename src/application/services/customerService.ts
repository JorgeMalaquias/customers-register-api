import { CreateUserBody } from "../../infra/http/DTOs/create-user-body";


export class CustomerService {

    private customerRepository;
    constructor() {
        this.customerRepository = 'xablau';
    }

    public get repository() {
        return this.customerRepository;
    }

    async getMany(size: number, page: number): Promise<any> {
        return 'getMany not implemented';
    }

    async getOne(cpf: string) {
        return 'getOne not implemented';
    }
    async createCustomer(data: CreateUserBody) {
        return 'createCustomer not implemented';
    }
}