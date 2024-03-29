"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _User = require('../app/models/User'); var _User2 = _interopRequireDefault(_User);
var _Question = require('../app/models/Question'); var _Question2 = _interopRequireDefault(_Question);
var _File = require('../app/models/File'); var _File2 = _interopRequireDefault(_File);

var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

const models = [_User2.default, _Question2.default, _File2.default];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new (0, _sequelize2.default)(_database2.default);

    models.map((model) => model.init(this.connection));
    models.map(
      (model) => model.associate && model.associate(this.connection.models)
    );
  }
}

exports. default = new Database();
