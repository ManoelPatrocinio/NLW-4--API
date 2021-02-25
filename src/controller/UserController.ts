import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";

class UserControlller{
    async create(request:Request, response:Response){
        const {name, email }    = request.body;
        const usersRepository   = getRepository(User);
        const userAlreadyExists = await usersRepository.findOne({ email }); // busca um usuario pelo email

        if (userAlreadyExists) {
            return response.status(400).json({
                error: "User alread existis !",
            });
        }

        const user              = usersRepository.create({
            name, email
        })

        await usersRepository.save(user);
        return response.json(user);
    }
}

export {UserControlller};