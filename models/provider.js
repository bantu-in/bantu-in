'use strict';
module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define('Provider', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    profilePicture: DataTypes.STRING,
    username : DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  Provider.associate = function(models) {
    // associations can be defined here
    Provider.hasMany(models.Post)
  };
  return Provider;
};