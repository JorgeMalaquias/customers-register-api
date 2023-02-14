import { IRouter, Router } from "express";
import { testing } from "../controllers/customersController";

const customerRouter: IRouter = Router();



export class CustomersRouter {
    private _router: IRouter;
    constructor() {
        this._router = Router();

        this._router.get('/', testing);
        this._router.get('/:cpf', testing);
        this._router.post('/', testing);
    }
    public get router() {
        return this._router;
    }
}