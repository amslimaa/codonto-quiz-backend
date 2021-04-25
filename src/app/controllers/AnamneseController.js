import * as Yup from 'yup';
import Anamnese from '../models/Anamnese';
import Pacient from '../models/Pacient';

class AnamneseController {
  async store(req, res) {
    const schema = Yup.object().shape({
      pacient_id: Yup.number().required(),
      had_symptom: Yup.boolean().required(),
      symptoms: Yup.string(),
      day_of_first_sympton: Yup.date().nullable().default(null),
      had_covid: Yup.boolean().required(),
      date_of_diagnosis: Yup.date().nullable().default(null),
      covid_cases_cycle: Yup.boolean().required(),
      death_case_by_covid: Yup.boolean().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validate fail' });
    }
    const {
      pacient_id,
      had_symptom,
      symptoms,
      day_of_first_sympton,
      had_covid,
      date_of_diagnosis,
      covid_cases_cycle,
      death_case_by_covid,
    } = await Anamnese.create(req.body);

    return res.json({
      pacient_id,
      had_symptom,
      symptoms,
      day_of_first_sympton,
      had_covid,
      date_of_diagnosis,
      covid_cases_cycle,
      death_case_by_covid,
    });
  }

  async show(req, res) {
    const anamneses = await Anamnese.findAll({
      attributes: ['can_be_consulted', 'created_at'],
      include: [{ model: Pacient, as: 'pacient', attributes: ['id', 'name'] }],
    });
    return res.json(anamneses);
  }
}
export default new AnamneseController();
