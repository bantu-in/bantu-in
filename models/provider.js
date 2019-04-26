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
  }, {
    hooks : {
      beforeCreate : function (user) {
        var salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  });
  Provider.associate = function(models) {
    // associations can be defined here
    Provider.hasMany(models.Post)
  };

  Provider.prototype.getFullName = () => {
    return [this.firstName, this.lastName].join(' ')
  }

  return Provider;
};