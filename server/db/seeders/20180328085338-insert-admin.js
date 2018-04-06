'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.sequelize.query('UPDATE Users set admin=true where id=1;')    ;
  },

  down : function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('Users', [{
      login : 'John12'
    }])
  }
};