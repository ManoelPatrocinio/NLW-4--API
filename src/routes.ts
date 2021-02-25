import { Router } from 'express';
import { UserControlller } from './controller/UserController';

const router = Router();
const userControlller = new UserControlller();

router.post("/users", userControlller.create);

export {router};