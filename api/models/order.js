const Sequelize   = require('sequelize');

module.exports = function(model) {
  return model.define('order', {
    orderNumber: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    orderDate: Sequelize.DATE,
    requiredDate: Sequelize.DATE,
    shippedDate: Sequelize.DATE,
    orderDate: Sequelize.DATE,
    status: Sequelize.STRING,
    comments: Sequelize.TEXT,
    customerNumber: Sequelize.INTEGER,
  }, {timestamps: false});
};

