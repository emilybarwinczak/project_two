'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.post.belongsTo(models.user)
      models.post.belongsToMany(models.tag, {through: "postTags"})
    }
  };
  post.init({
    // id: DataTypes.INTEGER,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    content: DataTypes.STRING,
    photo: DataTypes.STRING
    // createdAt: DataTypes.DATE,
    // updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};