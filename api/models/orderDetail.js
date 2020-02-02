const Sequelize   = require('sequelize');

module.exports = function(model) {
  return model.define('orderdetails', {
    orderNumber: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    productCode: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    quantityOrdered: Sequelize.INTEGER,
    priceEach: Sequelize.DECIMAL(10, 2),
    orderLineNumber: Sequelize.SMALLINT,
  }, {timestamps: false});
};

