import * as Yup from 'yup';
import Pacient from '../models/Pacient';

class PacientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      phone: Yup.string().required(),
      birth: Yup.date().required(),
      gen: Yup.string().required().max(1),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validate fail' });
    }
    const { name, phone, birth, gen } = await Pacient.create(req.body);

    return res.json({ name, phone, birth, gen });
  }
}
export default new PacientController();
