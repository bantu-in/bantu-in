'use strict';
module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define('Provider', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail : {
          args : true,
          msg : 'Invalid email format'
        }
      }
    },
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