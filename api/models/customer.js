const Sequelize   = require('sequelize');

module.exports = function(model) {
  return model.define('customers', {
    customerNumber: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    customerName: Sequelize.STRING,
    contactLastName: Sequelize.STRING,
    contactFirstName: Sequelize.STRING,
    phone: Sequelize.STRING,
    addressLine1: Sequelize.STRING,
    addressLine2: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    postalCode: Sequelize.STRING,
    country: Sequelize.STRING,
    salesRepEmployeeNumber: Sequelize.INTEGER,
    creditLimit: Sequelize.DECIMAL(10, 2),
  }, {timestamps: false});
};

