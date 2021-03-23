import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import Consult from '../models/Consult';
import Aluno from '../models/Aluno';
import Pacient from '../models/Pacient';

class ConsultaController {
  async store(req, res) {
    const schema = Yup.object().shape({
      pacient_id: Yup.number().required(),
      aluno_id: Yup.number().required(),
      date: Yup.date().required(),
      office: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }
    const { pacient_id, aluno_id, date, office } = req.body;

    const isAluno = await Aluno.findOne({ where: { id: aluno_id } });
    if (!isAluno) {
      return res.status(401).json({ error: 'You must pass a valid aluno_id' });
    }
    const isPacient = await Pacient.findOne({
      where: { id: pacient_id },
    });
    if (!isPacient) {
      return res
        .status(401)
        .json({ error: 'You must pass a valid  pacient_id' });
    }

    /**
     * check  for past dates
     */

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(401).json({ error: 'Past dates are not permitted' });
    }
    /**
     * check for availability
     */
    const checkAvailability = await Consult.findOne({
      where: { aluno_id, canceled_at: null, date: hourStart },
    });

    if (checkAvailability) {
      return res
        .status(401)
        .json({ error: 'Consult date are not availability' });
    }

    const consult = await Consult.create({
      pacient_id,
      aluno_id,
      date: hourStart,
      office,
    });

    return res.json(consult);
  }
}
export default new ConsultaController();
