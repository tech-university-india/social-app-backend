'use strict';
const {
	Model
} = require('sequelize');

const { entityTypes } = require('../Utils/Constants');

module.exports = (sequelize, DataTypes) => {
	class Entity extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
			this.belongsTo(models.User, { foreignKey: 'createdBy' });
			this.hasMany(models.Action, { foreignKey: 'entityId' , onDelete: 'CASCADE', hooks: true });
			this.hasMany(models.Tag, { foreignKey: 'entityId' , onDelete: 'CASCADE', hooks: true });
		}
	}
	Entity.init({
		type: {
			allowNull: false,
			type: DataTypes.ENUM(entityTypes.POST, entityTypes.ANNOUNCEMENT),
		},
		caption: DataTypes.TEXT,
		imageURL: DataTypes.ARRAY(DataTypes.STRING),
		meta: DataTypes.JSONB,
		location: DataTypes.ARRAY(DataTypes.STRING),
		createdBy: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'Entity',
	});
	return Entity;
};