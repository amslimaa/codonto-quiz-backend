import Question from '../models/Question';
import File from '../models/File';

class QuizController {
  async show(req, res) {
    const questions = await Question.findAll({
      where: { active: true },
      attributes: ['id', 'question', 'response', 'fake', 'image_id'],
      include: [
        { model: File, as: 'image', attributes: ['name', 'path', 'url'] },
      ],
    });
    return res.json(questions);
  }

  async update(req, res) {
    const { id, fake } = req.body;

    const question = await Question.findOne({
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

export default new QuizController();
