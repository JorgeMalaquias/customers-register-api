import { Server } from "../../server"
import express, { Express, response } from "express";
import supertest from "supertest";
import { prisma } from "../../infra/database/prisma";
import { Customer } from "@prisma/client";
import { object, string } from "joi";
import { cpfMapper } from "../../application/mappers/customerRepositoryMapper";

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
    it('Should return status 409 when a customer already exist', async () => {
        const body = {
            name: "Jorge",
            cpf: "047.876.770-63",
            birth: "2000-03-15"
        }
        await supertest(server.appTest).post("/customers").send(body);
        const result = await supertest(server.appTest).post("/customers").send(body);
        const status = result.status;
        expect(status).toEqual(409);
    });
    it('Should return status 400 when the body of a request is not valid: cpf format invalid', async () => {
        const body = {
            name: "Jorge",
            cpf: "047.876.770-6",
            birth: "2000-03-15"
        }
        const result = await supertest(server.appTest).post("/customers").send(body);
        const status = result.status;
        expect(status).toEqual(400);
    });
    it('Should return status 422 when the cpf is invalid', async () => {
        const body = {
            name: "Jorge",
            cpf: "047.876.770-69",
            birth: "2000-03-15"
        }
        const result = await supertest(server.appTest).post("/customers").send(body);
        const status = result.status;
        expect(status).toEqual(422);
    });
    it('Should return status 400 when the body of a request is not valid: name starting with lower case', async () => {
        const body = {
            name: "jorge",
            cpf: "047.876.770-6",
            birth: "2000-03-1"
        }
        const result = await supertest(server.appTest).post("/customers").send(body);
        const status = result.status;
        expect(status).toEqual(400);
    });
    it('Should return status 400 when the body of a request is not valid: birth invalid', async () => {
        const body = {
            name: "Jorge",
            cpf: "047.876.770-63",
            birth: "2000-03-1"
        }
        const result = await supertest(server.appTest).post("/customers").send(body);
        const status = result.status;
        expect(status).toEqual(400);
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
        const status = result.status;
        expect(status).toEqual(404);
    });



    it('Should return one customer when one has been created', async () => {
        const body = {
            name: "Jorge",
            cpf: "047.876.770-63",
            birth: "2000-03-15"
        }
        await supertest(server.appTest).post("/customers").send(body);
        const result = await supertest(server.appTest).get("/customers?page=0&size=5");
        const returning = result.body;
        expect(returning).toHaveLength(1);
    });
    it('Should return two customer when two have been created', async () => {
        const body = {
            name: "Jorge",
            cpf: "047.876.770-63",
            birth: "2000-03-15"
        }
        await supertest(server.appTest).post("/customers").send(body);
        const body2 = {
            name: "Jobiscleiton",
            cpf: "957.050.990-29",
            birth: "2000-03-15"
        }
        await supertest(server.appTest).post("/customers").send(body2);
        const result = await supertest(server.appTest).get("/customers?page=0&size=5");
        const returning = result.body;
        expect(returning).toHaveLength(2);
    });
    it('Should return a status 400 when the page informed does not correspond to any customer', async () => {
        const body = {
            name: "Jorge",
            cpf: "047.876.770-63",
            birth: "2000-03-15"
        }
        await supertest(server.appTest).post("/customers").send(body);
        const body2 = {
            name: "Jobiscleiton",
            cpf: "957.050.990-29",
            birth: "2000-03-15"
        }
        await supertest(server.appTest).post("/customers").send(body2);
        const result = await supertest(server.appTest).get("/customers?page=1&size=5");
        const status = result.status;
        expect(status).toEqual(400);
    });
    it('Should return a message when no customer has been created', async () => {

        await supertest(server.appTest).get("/customers?page=0&size=5").expect(200, 'There are no customers registered!');

    });
})
