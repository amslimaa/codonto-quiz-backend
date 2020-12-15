import Consulta from '../models/Consult';

class ConsultaController {
  async store(req, res) {
    const {
      number_of_office,
      date_of_consultation,
      aluno_id,
      pacient_id,
    } = await Consulta.create(req.body);
    return res.json({
      number_of_office,
      date_of_consultation,
      aluno_id,
      pacient_id,
    });
  }
}
export default new ConsultaController();
