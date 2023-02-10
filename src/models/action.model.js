'use strict';
const {
  Model
} = require('sequelize');

const { actionTypes } = require('../Utils/Constants');

module.exports = (sequelize, DataTypes) => {
  class Action extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'createdBy' });
      this.belongsTo(models.Entity, { foreignKey: 'entityId' });
    }
  }
  Action.init({
    type: {
      allowNull: false,
      type: DataTypes.ENUM(actionTypes.LIKE, actionTypes.COMMENT),
    },
    entityId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    meta: DataTypes.JSONB,
    createdBy: {
      allowNull: false,
      type: DataTypes.INTEGER}
  }, {
    sequelize,
    modelName: 'Action',
  });
  return Action;
};