'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Auth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Auth.init({
    FMNO: {
			allowNull: false,
			unique: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		email: {
			allowNull: false,
			type: DataTypes.STRING
		},
		passwordHash: {
			allowNull: false,
			type: DataTypes.TEXT
		},
  }, {
    sequelize,
    modelName: 'Auth',
  });
  Auth.removeAttribute('id');
  return Auth;
};