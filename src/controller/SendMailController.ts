import { request, response } from "express"
import { resolve } from 'path';
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repositories/SurveyRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../service/sendMailservice";
import { AppError } from "../errors/AppError";


class SendMailController {

    async exucute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const usersRepository        = getCustomRepository(UsersRepository);
        const surveyRepository       = getCustomRepository(SurveyRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const user = await usersRepository.findOne({ email });

        if (!user) {
            throw new AppError("User does not exists");
        }

        const survey = await surveyRepository.findOne({ id: survey_id });

        if (!survey) {
            throw new AppError("Survey does not exists");
        }

        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs"); //__dirname:pega o caminho da aplicação;
     

        //regra que impede que exista mais de uma pesquisa para um usuário
        const surveyUserAlrealyExists = await surveysUsersRepository.findOne({
            where: { user_id: user.id, value: null },
            relations: ["user", "survey"],
        })

        const variables = {
            id: "",
            name: user.name,
            title: survey.title,
            link: process.env.URL_MAIL,
            description: survey.description,

        }

        if (surveyUserAlrealyExists) {

            variables.id = surveyUserAlrealyExists.id;
            await SendMailService.execute(email, survey.title, variables, npsPath);
            return response.json(surveyUserAlrealyExists);
        }

        // salvar as informações na tabela SurveyUser
        const surveyUser = surveysUsersRepository.create({
            user_id: user.id,
            survey_id,
        });

        await surveysUsersRepository.save(surveyUser);
        
        variables.id = surveyUser.id;7

        //envia o e-mail para o usuario 
        //execute espera um (to: string, subject: string, body: string)
        await SendMailService.execute(email, survey.title, variables, npsPath);
        return response.json(surveyUser)
    }

}

export { SendMailController }