'use strict';

module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Messages', [{
      loginID : 2,
      message : 'Lorem ipsusm sssasd asdasdasd '
    }], {});
  },

  down : function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('Messages', [{
      // login : 'John12'
    }])
  }
};