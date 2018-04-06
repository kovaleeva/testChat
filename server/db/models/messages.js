'use strict';
module.exports = (sequelize, DataTypes) => {
  var Messages = sequelize.define('Messages', {
    loginID: {
      type: DataTypes.INTEGER
    },
    message: DataTypes.STRING(200),
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
          Messages.belongsTo(models.Users, { foreignKey: "loginID", name:"fk"});
        },
      },
    });

  return Messages;
};