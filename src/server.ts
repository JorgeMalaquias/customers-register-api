import express, { Express } from "express";
import "express-async-errors";
import cors from "cors";
import { CustomersRouter } from "./infra/routes/customersRouter";

class Server {
    private port?: string;
    private app: Express;
    constructor(app: Express, port?: string) {
        this.port = port;
        this.app = app;
    }
    settings() {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use((new CustomersRouter()).router);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`server running on port ${this.port}`);
        })
    }
}

const server = new Server(express(), process.env.PORT);

server.settings();
server.listen();
