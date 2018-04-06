'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    login: {
      type: DataTypes.STRING,
      validate: {
        is: /^(?![\%\/\\\&\?\,\'\;\:\!\-\+\!\@\#\$\^\*\)\(]+$).+/i,
        len: [3, 20]
      }
    },
    password: DataTypes.STRING,
    ban: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN,
    mute: DataTypes.BOOLEAN,
    admin: DataTypes.BOOLEAN,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'created_at'
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'updated_at'      
    }
  }, {
      timestamps: true,
      classMethods: {
        associate: function (models) {
          Users.hasMany(models.Messages, { 
            foreignKey: "loginID"
          });
        },
      },
    });


  return Users;
};