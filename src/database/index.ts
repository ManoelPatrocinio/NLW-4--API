import { promises } from "fs";
import {Connection, createConnection, getConnectionOptions} from "typeorm";

export default async(): Promise<Connection> =>{
    const defaultOptions = await getConnectionOptions(); // coleta todas as informações do ormconfig
    return createConnection(
        Object.assign(defaultOptions,{ //pega todas as informações do ormconfig e só sobre escreve o database
            database: process.env.NODE_ENV === 'test' ? "./src/database/database.test.sqlite" : defaultOptions.database
        })
    );
}






