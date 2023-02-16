import { Server } from "../../src/server"
import express, { Express } from "express";
import supertest from "supertest";
import { prisma } from "../../src/infra/database/prisma";
import { Customer } from "@prisma/client";
import { object } from "joi";
import { cpfMapper } from "../../src/application/mappers/customerRepositoryMapper";

const server = new Server(express());
server.settings();

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE customers;`;
});
describe('Integration tests', () => {
    it('Should create a new customer when the body of the request is valid', async () => {
        const body = {
            name: "Jorge",
            cpf: "047.876.770-63",
            birth: "2000-03-15"
        }
        const result = await supertest(server.appTest).post("/customers").send(body);
        const status = result.status;
        expect(status).toEqual(201);
    });
    it('Should return a customer who has been created', async () => {
        const body = {
            name: "Jorge",
            cpf: "047.876.770-63",
            birth: "2000-03-15"
        }
        await supertest(server.appTest).post("/customers").send(body);
        const result = await supertest(server.appTest).get("/customers/047.876.770-63");
        const returning = result.body;
        expect(returning.cpf).toEqual(cpfMapper(body.cpf));
    });
    it('Should not return a customer who has not been created', async () => {

        const result = await supertest(server.appTest).get("/customers/047.876.770-63");
        const returning = result.body;
        expect(returning.cpf).toBeFalsy();
    });
    it('Should return a customer who has been created', async () => {
        const body = {
            name: "Jorge",
            cpf: "047.876.770-63",
            birth: "2000-03-15"
        }
        await supertest(server.appTest).post("/customers").send(body);
        const result = await supertest(server.appTest).get("/customers?page=0&size=5");
        const returning = result.body;
        console.log(returning);
        expect(returning).toHaveLength(1);
    });
})
