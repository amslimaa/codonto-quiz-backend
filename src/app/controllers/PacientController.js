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

    const phoneAlreadyExist = await Pacient.findOne({
      where: {
        phone: req.body.phone,
        birth: req.body.birth,
      },
    });
    if (phoneAlreadyExist) {
      return res.status(400).json({ error: 'Pacient already exists' });
    }

    const { name, phone, birth, gen } = await Pacient.create(req.body);

    return res.json({ name, phone, birth, gen });
  }

  async show(req, res) {
    const { phone, birth } = req.query;
    console.log({ phone, birth });
    const pacient = await Pacient.findOne({
      where: {
        phone,
        birth,
      },
    });
    if (!pacient) {
      return res.status(401).json({ error: 'Paciente não encontrado' });
    }
    return res.json(pacient);
  }
}
export default new PacientController();
