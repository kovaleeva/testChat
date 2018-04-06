'use strict';

module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Messages', [{
      loginID : 1,
      message : 'Lorem ipsum asd asdasdasd '
    }], {});
  },

  down : function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('Messages', [{
      // login : 'John12'
    }])
  }
};