"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Question = require('../models/Question'); var _Question2 = _interopRequireDefault(_Question);

class QuestionController {
  async show(req, res) {
    const questions = await _Question2.default.findAll();
    return res.json(questions);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
      response: Yup.string().required(),
      fake: Yup.boolean().required(),
      active: Yup.boolean(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validate fails ' });
    }
    const question = await _Question2.default.create(req.body);
    return res.json(question);
  }

  async update(req, res) {
    const { id } = req.body;
    const questionUpdated = await _Question2.default.findOne({ where: { id } });

    if (!questionUpdated) {
      return res.status(401).json({ error: 'ID invalid' });
    }
    const { question, response, fake, active } = await questionUpdated.update(
      req.body
    );
    return res.json({ question, response, fake, active });
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().integer().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validate fails' });
    }
    const { id } = req.body;
    const questionDeleted = await _Question2.default.findOne({ where: { id } });
    if (!questionDeleted) {
      return res.status(401).json({ error: 'Id invalid ' });
    }
    await _Question2.default.destroy({ where: { id }, force: true });
    return res.status(200).json();
  }
}

exports. default = new QuestionController();
