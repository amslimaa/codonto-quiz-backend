import * as Yup from 'yup';
import PlayerType from '../models/PlayerType';

class PlayerTypeController {
  async store(req, res) {
    const schema = Yup.object().shape({
      type: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validate fails ' });
    }
    const playertype = await PlayerType.create(req.body);
    return res.json(playertype);
  }

  async update(req, res) {
    const { id } = req.body;
    const playerVoted = await PlayerType.findOne({ where: { id } });
    const count_rounds = playerVoted.count_rounds + 1;

    await playerVoted.update({ count_rounds });
    console.log(count_rounds);
    return res.status(200).json();
  }
}

export default new PlayerTypeController();
