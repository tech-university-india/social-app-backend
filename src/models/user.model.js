'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
			this.hasMany(models.Entity, { foreignKey: 'createdBy', onDelete: 'CASCADE', hooks: true });
			this.belongsToMany(models.Interest, { through: 'UserInterests', foreignKey: 'userId', onDelete: 'CASCADE', hooks: true });
			this.hasMany(models.Action, { foreignKey: 'createdBy', onDelete: 'CASCADE', hooks: true });
			this.belongsToMany(models.User, { through: 'UserFollows', foreignKey: 'followingId', as: 'following', onDelete: 'CASCADE', hooks: true });
			this.belongsToMany(models.User, { through: 'UserFollows', foreignKey: 'followerId', as: 'followers', onDelete: 'CASCADE', hooks: true });
			this.hasMany(models.Tag, { foreignKey: 'taggedId', onDelete: 'CASCADE', hooks: true });
			this.hasMany(models.Notification, { foreignKey: 'createdBy', onDelete: 'CASCADE', hooks: true });
		}
	}
	User.init({
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
		paswordHash: {
			allowNull: false,
			type: DataTypes.TEXT
		},
		bio: DataTypes.TEXT,
		userName: {
			allowNull: false,
			type: DataTypes.STRING
		},
		designation: {
			allowNull: false,
			type: DataTypes.STRING
		},
		profilePictureURL: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'User',
	});
	User.removeAttribute('id');
	return User;
};