import { Router } from 'express';
import { UserController } from './controller/UserController';
import { SurveyController } from './controller/SurveyController';
import { SendMailController } from './controller/SendMailController';

const router = Router();
const userControlller = new UserController();
const surveyControlller = new SurveyController();
const sendMailController = new SendMailController();


router.post("/users", userControlller.create);
router.post("/survey", surveyControlller.create);
router.get("/survey", surveyControlller.show);
router.post("/sendMail", sendMailController.exucute);


export { router };