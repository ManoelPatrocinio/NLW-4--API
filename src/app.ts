import 'reflect-metadata';
import express, { NextFunction,Request, Response } from "express";
import "express-async-errors";
import createConnection from './database';
import { router } from './routes';
import { AppError } from './errors/AppError';

createConnection();
const app = express();

app.use(express.json());
app.use(router);
app.use(
    (e:Error, request: Request, response: Response, next: NextFunction) =>{
        if (e instanceof AppError) {
            return response.status(e.statusCode).json({
                message: e.message
            });
        }

        return response.status(500).json({
            status: "Error",
            message:  `Intenal server error ${e.message}`,
        })

    }
)

export { app };