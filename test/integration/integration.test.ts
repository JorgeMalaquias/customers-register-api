import { Server } from "../../src/server"
import express, { Express } from "express";
import supertest from "supertest";

const server = new Server(express());
server.settings();

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
    })
})
