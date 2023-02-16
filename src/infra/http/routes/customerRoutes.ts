import { IRouter, Router } from "express";
import { CustomerController } from "../controllers/customerController";
import { ParamsValidate } from "../middlewares/paramsValidate";
import { SchemaValidate } from "../middlewares/schemaValidate";
import customerSchema from "../schemas/customerSchema";


export class CustomerRoutes {

    private _routes = Router();
    private customerController;
    private customerBodyValidation: SchemaValidate;
    private paramsValidation: ParamsValidate;
    constructor() {
        this.customerBodyValidation = new SchemaValidate(customerSchema);
        this.paramsValidation = new ParamsValidate();
        this.customerController = new CustomerController();
        this.loadRoutes();
    }
    public get routes(): IRouter {
        return this._routes;
    }

    loadRoutes(): void {
        this._routes.get('/customers', this.paramsValidation.execute, this.customerController.getCustomerWithPagination);
        this._routes.get('/customers/:cpf', this.customerController.getCustomerByCpf);
        this._routes.post('/customers', this.customerBodyValidation.execute, this.customerController.createCustomer);
    }
}