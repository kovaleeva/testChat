'use strict';

module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      login : 'Json2',
      password : '312',
      admin : true,
      status : true
    }], {});
  },

  down : function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('Users', [{
      login :'John1'
    }])
  }
};