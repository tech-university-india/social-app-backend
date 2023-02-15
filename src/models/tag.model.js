'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Tag extends Model {
		/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
		static associate(models) {
			// define association here
			this.belongsTo(models.Entity, { foreignKey: 'entityId' });
			this.belongsTo(models.User, { foreignKey: 'taggedId' });
		}
	}
	Tag.init({
		entityId: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		taggedId: {
			allowNull: false,
			type: DataTypes.INTEGER
		}
	}, {
		updatedAt: false,
		sequelize,
		modelName: 'Tag',
	});
	Tag.removeAttribute('updatedAt');
	return Tag;
};