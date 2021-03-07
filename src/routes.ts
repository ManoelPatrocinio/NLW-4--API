import { Router }             from 'express';
import { UserController }     from './controller/UserController';
import { SurveyController }   from './controller/SurveyController';
import { SendMailController } from './controller/SendMailController';
import { AnswerController }   from './controller/AnswerController';
import { NpsController } from './controller/NpsController';

const router = Router();
const userControlller    = new UserController();
const surveyControlller  = new SurveyController();
const sendMailController = new SendMailController();
const answerController   = new AnswerController();
const npsController      = new NpsController();


router.post("/users", userControlller.create);
router.post("/survey", surveyControlller.create);
router.get ("/survey", surveyControlller.show);
router.post("/sendMail", sendMailController.exucute);
router.get ("/answers/:value", answerController.execute);
router.get ("/nps/:survey_id", npsController.execute);

export { router };