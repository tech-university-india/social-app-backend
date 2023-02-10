'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserInterest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Interest, { foreignKey: 'interestId' });
      this.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  UserInterest.init({
    interestId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserInterest',
  });
  UserInterest.removeAttribute('updatedAt');
  return UserInterest;
};