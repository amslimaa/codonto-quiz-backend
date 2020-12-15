import Sequelize, { Model } from 'sequelize';

import bcrypt from 'bcryptjs';

class Aluno extends Model {
  static init(sequelize) {
    super.init(
      {
        matricula: Sequelize.INTEGER,
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    this.addHook('beforeSave', async (aluno) => {
      if (aluno.password) {
        aluno.password_hash = await bcrypt.hash(aluno.password, 8);
      }
    });
    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }
}
export default Aluno;
