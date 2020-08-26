import Sequelize, { Model } from 'sequelize';

class Question extends Model {
  static init(sequelize) {
    super.init(
      {
        question: Sequelize.TEXT,
        response: Sequelize.TEXT,
        fake: Sequelize.BOOLEAN,
        count_hits: Sequelize.INTEGER,
        count_miss: Sequelize.INTEGER,
        active: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'image_id', as: 'image' });
  }
}
export default Question;
