'use strict';
var bcrypt = require('bcryptjs');
const crypto = require('crypto')

module.exports = (sequelize, DataTypes) => {
  const Worker = sequelize.define('Worker', {
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
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks : {
      beforeCreate : function (user) {
        var salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  });
  Worker.associate = function(models) {
    // associations can be defined here
    Worker.hasMany(models.Post)
  };

  Worker.prototype.getFullName = () => {
    return [this.firstName, this.lastName].join(' ')
  }

  return Worker;
};