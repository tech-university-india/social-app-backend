'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Follow extends Model {
		/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
		static associate(models) {
			// define association here
			// create the association between the Follow model and the User model
			this.belongsTo(models.User, { foreignKey: 'followerId' });
			this.belongsTo(models.User, { foreignKey: 'followingId' });
		}
	}
	Follow.init({
		followerId: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		followingId: {
			allowNull: false,
			type: DataTypes.INTEGER
		}
	}, {
		updatedAt: false,
		sequelize,
		modelName: 'Follow',
	});
	Follow.removeAttribute('updatedAt');
	return Follow;
};