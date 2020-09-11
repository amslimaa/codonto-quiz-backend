"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Question = require('../models/Question'); var _Question2 = _interopRequireDefault(_Question);
var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);

class QuizController {
  async show(req, res) {
    const questions = await _Question2.default.findAll({
      where: { active: true },
      attributes: ['id', 'question', 'response', 'fake', 'image_id'],
      include: [
        { model: _File2.default, as: 'image', attributes: ['name', 'path', 'url'] },
      ],
    });
    return res.json(questions);
  }

  async update(req, res) {
    const { id, fake } = req.body;

    const question = await _Question2.default.findOne({
      where: { id },
      attributes: ['id', 'count_hits', 'count_miss', 'fake'],
    });

    if (!(question.fake === fake)) {
      const count_miss = question.count_miss + 1;
      await question.update({ count_miss });
      return res.json(question);
    }
    const count_hits = question.count_hits + 1;
    await question.update({ count_hits });

    return res.json(question);
  }
}

exports. default = new QuizController();
