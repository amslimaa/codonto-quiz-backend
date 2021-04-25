import Sequelize, { Model } from 'sequelize';

class Pacient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        phone: Sequelize.STRING,
        birth: Sequelize.STRING,
        gen: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}
export default Pacient;
