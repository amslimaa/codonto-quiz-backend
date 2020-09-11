"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Question extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        question: _sequelize2.default.TEXT,
        response: _sequelize2.default.TEXT,
        fake: _sequelize2.default.BOOLEAN,
        count_hits: _sequelize2.default.INTEGER,
        count_miss: _sequelize2.default.INTEGER,
        active: _sequelize2.default.BOOLEAN,
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
exports. default = Question;
