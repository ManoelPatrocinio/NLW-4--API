import { Request, Response } from "express";
import { stringify } from "node:querystring";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {
   
    async execute(request:Request, response:Response){
        const { value } = request.params;
        const { u }     = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
        
        //verifica se ID de pesquisa enviada valido
        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        });

        if(!surveyUser){
            throw new AppError("Survey User does not exists !")
        }

        //caso o tenha uma pesquisa enviado para o usuario
        surveyUser.value = Number(value); //salva a nota dada pelo user
        await surveysUsersRepository.save(surveyUser); // salva a resposta do user no banco

        return response.json(surveyUser);
    }
}

export{ AnswerController }