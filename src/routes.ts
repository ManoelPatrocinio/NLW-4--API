import { Router } from 'express';
import { UserController } from './controller/UserController';
import { SurveyController } from './controller/SurveyController';

const router = Router();
const userControlller = new UserController();
const surveyControlller = new SurveyController();


router.post("/users", userControlller.create);
router.post("/survey", surveyControlller.create);
router.get("/survey", surveyControlller.show);


export {router};