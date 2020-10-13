import Sequelize, { Model } from 'sequelize';

class PlayerType extends Model {
  static init(sequelize) {
    super.init(
      { type: Sequelize.STRING, count_rounds: Sequelize.INTEGER },
      { sequelize }
    );
    return this;
  }
}
export default PlayerType;
