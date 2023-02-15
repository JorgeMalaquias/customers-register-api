import { IRouter, Router } from "express";
import { CustomerController } from "../controllers/customerController";


export class CustomerRoutes {

    private _routes = Router();
    private customerController;

    constructor() {
        this.customerController = new CustomerController();
        this.loadRoutes();
    }
    public get routes(): IRouter {
        return this._routes;
    }

    loadRoutes(): void {
        this._routes.get('/customers', this.customerController.getCustomerWithPagination);
        this._routes.get('/customers/:cpf', this.customerController.getCustomerByCpf);
        this._routes.post('/customers', this.customerController.createCustomer);
    }
}