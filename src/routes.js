import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import QuestionController from './app/controllers/QuestionController';
import FileController from './app/controllers/FileController';
import QuizController from './app/controllers/QuizController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);
routes.get('/quiz', QuizController.show);
routes.put('/quiz', QuizController.update);

routes.get('/', (req, res) => res.send('ok'));

routes.use(authMiddleware);
routes.get('/profile', UserController.show);
routes.get('/questions', QuestionController.show);
routes.post('/questions', QuestionController.store);
routes.put('/questions', QuestionController.update);
routes.delete('/questions', QuestionController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
