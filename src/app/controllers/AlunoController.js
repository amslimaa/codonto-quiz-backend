import * as Yup from 'yup';

import Aluno from '../models/Aluno';

class AlunoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required().min(6),
      email: Yup.string().email().required(),
      matricula: Yup.number().required().min(4),
      password: Yup.string().required().min(6),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation Fails' });
    }

    const emailAlreadyExist = await Aluno.findOne({
      where: { email: req.body.email },
    });

    if (emailAlreadyExist) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const matriculaAlreadyExist = await Aluno.findOne({
      where: { matricula: req.body.matricula },
    });

    if (matriculaAlreadyExist) {
      return res.status(400).json({ error: 'Matricula already exists' });
    }
    const { name, matricula, email, password, avatar_id } = await Aluno.create(
      req.body
    );
    return res.json({ name, matricula, email, password, avatar_id });
  }
}
export default new AlunoController();
