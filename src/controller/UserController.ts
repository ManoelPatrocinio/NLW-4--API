import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import * as yup from 'yup';
import { AppError } from "../errors/AppError";

class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;
        const usersRepository = getCustomRepository(UsersRepository);
        const userAlreadyExists = await usersRepository.findOne({ email }); // busca um usuario pelo email

        const schema = yup.object().shape({
            name: yup.string().required("Nome é obrigatório"),
            email: yup.string().email().required("Email não informado ou incorreto")
        })

        try {
            await schema.validate(request.body,{ abortEarly:false}); //abortEarly:false: desabilita a exibição de um erro por vez,e mostra todos os erros,
        } catch (e) {
            throw new AppError(e);
        }

        if (userAlreadyExists) {
            throw new AppError("User alread existis !");
           
        }

        const user = usersRepository.create({
            name, email
        })

        await usersRepository.save(user);
        return response.status(201).json(user);
    }
}

export { UserController };
