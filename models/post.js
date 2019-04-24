'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER,
    ProviderId: DataTypes.INTEGER,
    WorkerId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    workerNeeded: DataTypes.INTEGER,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    Post.hasMany(models.Tag)
    Post.hasMany(models.Image)
    Post.hasOne(models.Category)
    Post.belongsTo(models.Worker)
    Post.belongsTo(models.Provider)
  };
  return Post;
};