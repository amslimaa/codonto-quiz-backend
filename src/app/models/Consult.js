import Sequelize, { Model } from 'sequelize';

class Consult extends Model {
  static init(sequelize) {
    super.init(
      {
        number_of_office: Sequelize.INTEGER,
        date_of_consultation: Sequelize.DATE,
      },

      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: 'aluno_id', as: 'aluno' });
    this.belongsTo(models.Pacient, { foreignKey: 'pacient_id', as: 'pacient' });
  }
}
export default Consult;
