import { response } from 'express';
import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';
import createConnection from '../database';


describe( "User", () => {

    //executa as migrations antes de iniciar os testes
    beforeAll( async() => {
        const connection = await createConnection();
        await connection.runMigrations();
    })

    //dropa o database despois de um tese
    afterAll(async() =>{
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    })

    it("Should be able to create a new user", async() => {
        const reponse = await request(app).post("/users")    /*qual rota que testar*/
        .send({                                              //obejeto para test
            email: "user@exemplo.com",
            name: "User Examplo"
        }) 

        expect(response.status).toBe(201);
    })


})