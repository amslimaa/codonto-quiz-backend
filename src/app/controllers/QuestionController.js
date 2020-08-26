import * as Yup from 'yup';
import Question from '../models/Question';

class QuestionController {
  async show(req, res) {
    const questions = await Question.findAll();
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
    const question = await Question.create(req.body);
    return res.json(question);
  }

  async update(req, res) {
    const { id } = req.body;
    const questionUpdated = await Question.findOne({ where: { id } });

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
    const questionDeleted = await Question.findOne({ where: { id } });
    if (!questionDeleted) {
      return res.status(401).json({ error: 'Id invalid ' });
    }
    await Question.destroy({ where: { id }, force: true });
    return res.status(200).json();
  }
}

export default new QuestionController();
