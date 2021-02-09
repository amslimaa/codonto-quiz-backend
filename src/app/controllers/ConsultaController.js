import * as Yup from 'yup';
import Consult from '../models/Consult';

class ConsultaController {
  async store(req, res) {
    const schema = Yup.object().shape({
      pacient_id: Yup.number().required(),
      date: Yup.date().required(),
      office: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }
    const { pacient_id, date, office } = req.body;

    return res.json({ pacient_id, date, office });
  }
}
export default new ConsultaController();
