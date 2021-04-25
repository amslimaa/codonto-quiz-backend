import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import QuestionController from './app/controllers/QuestionController';
import PlayerTypeController from './app/controllers/PlayerTypeController';
import FileController from './app/controllers/FileController';
import QuizController from './app/controllers/QuizController';
import PacientController from './app/controllers/PacientController';
import AnamneseController from './app/controllers/AnamneseController';
import AlunoController from './app/controllers/AlunoController';
import ConsultaController from './app/controllers/ConsultaController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/pacients', PacientController.store);

routes.get('/pacients', PacientController.show);

routes.post('/anamneses', AnamneseController.store);

routes.post('/sessions', SessionController.store);
routes.get('/quiz', QuizController.show);
routes.put('/quiz', QuizController.update);

routes.get('/playerstype', PlayerTypeController.show);
routes.put('/playerstype', PlayerTypeController.update);

routes.get('/', (req, res) => res.send('ok'));

routes.use(authMiddleware);

routes.get('/anamneses', AnamneseController.show);
routes.post('/consultas', ConsultaController.store);
routes.get('/consultas', ConsultaController.show);
routes.post('/alunos', AlunoController.store);
routes.post('/playerstype', PlayerTypeController.store);
routes.get('/profile', UserController.show);
routes.get('/questions', QuestionController.show);
routes.post('/questions', QuestionController.store);
routes.put('/questions', QuestionController.update);
routes.delete('/questions', QuestionController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
