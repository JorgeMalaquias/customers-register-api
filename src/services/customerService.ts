


export class CustomerService {

    private customerRepository;
    constructor() {
        this.customerRepository = 'xablau';
    }

    public get repository() {
        return this.customerRepository;
    }

    async getMany(): Promise<any> {
        return 'getMany not implemented';
    }

    async getOne() {
        return 'getOne not implemented';
    }
    async createCustomer() {
        return 'createCustomer not implemented';
    }
}