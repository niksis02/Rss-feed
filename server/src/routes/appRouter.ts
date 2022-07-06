import { Router } from 'express';
import { appController, getUser } from '../controllers/appController';
import { jwtAuth } from '../middlewares/authentication';
import authRouter from './authRouter';

const appRouter = Router();

appRouter.get('/', appController);
appRouter.get('/me', jwtAuth, getUser);
appRouter.use('/', authRouter);

export default appRouter;
