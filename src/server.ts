import express, { Express } from "express";
import "express-async-errors";
import cors from "cors";
import { CustomerRoutes } from "./infra/http/routes/customerRoutes";
import { errorHandlerMiddleware } from "./infra/http/middlewares/errorHandler";

export class Server {

    private port?: string;
    private app: Express;
    private customerRoutes: CustomerRoutes;

    constructor(app: Express, port?: string) {
        this.port = port;
        this.app = app;
        this.customerRoutes = new CustomerRoutes();
    }

    settings(): void {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(this.customerRoutes.routes);
        this.app.use(errorHandlerMiddleware);
    }
    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`server running on port ${this.port}`);
        })
    }
    public get appTest() {
        return this.app;
    }
}

const server = new Server(express(), process.env.PORT);
server.settings();
server.listen();
