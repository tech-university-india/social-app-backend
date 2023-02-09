'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Notification extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
			this.belongsTo(models.User, { foreignKey: 'createdBy' });
		}
	}
	Notification.init({
		destinationURL: DataTypes.STRING,
		meta: DataTypes.JSONB,
		createdBy: {
			allowNull: false,
			type: DataTypes.INTEGER
		}
	}, {
		sequelize,
		modelName: 'Notification',
	});
	Notification.removeAttribute('updatedAt');
	return Notification;
};