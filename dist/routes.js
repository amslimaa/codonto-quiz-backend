"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

var _multer3 = require('./config/multer'); var _multer4 = _interopRequireDefault(_multer3);
var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _QuestionController = require('./app/controllers/QuestionController'); var _QuestionController2 = _interopRequireDefault(_QuestionController);
var _FileController = require('./app/controllers/FileController'); var _FileController2 = _interopRequireDefault(_FileController);
var _QuizController = require('./app/controllers/QuizController'); var _QuizController2 = _interopRequireDefault(_QuizController);

var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const routes = new (0, _express.Router)();

const upload = _multer2.default.call(void 0, _multer4.default);

routes.post('/sessions', _SessionController2.default.store);
routes.get('/quiz', _QuizController2.default.show);
routes.put('/quiz', _QuizController2.default.update);

routes.get('/', (req, res) => res.send('ok'));

routes.use(_auth2.default);
routes.get('/profile', _UserController2.default.show);
routes.get('/questions', _QuestionController2.default.show);
routes.post('/questions', _QuestionController2.default.store);
routes.put('/questions', _QuestionController2.default.update);
routes.delete('/questions', _QuestionController2.default.delete);

routes.post('/files', upload.single('file'), _FileController2.default.store);

exports. default = routes;
