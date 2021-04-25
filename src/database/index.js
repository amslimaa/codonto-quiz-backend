import Sequelize from 'sequelize';
import Users from '../app/models/User';
import Question from '../app/models/Question';
import PlayerType from '../app/models/PlayerType';
import File from '../app/models/File';
import Pacient from '../app/models/Pacient';
import Anamnese from '../app/models/Anamnese';
import Aluno from '../app/models/Aluno';
import Consult from '../app/models/Consult';

const models = [
  Users,
  Question,
  PlayerType,
  File,
  Pacient,
  Anamnese,
  Aluno,
  Consult,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
    });

    models.map((model) => model.init(this.connection));
    models.map(
      (model) => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
