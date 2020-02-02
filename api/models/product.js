const Sequelize   = require('sequelize');

module.exports = function(model) {
  return model.define('product', {
    productCode: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    productName: Sequelize.STRING,
    productLine: Sequelize.STRING,
    productScale: Sequelize.STRING,
    productVendor: Sequelize.STRING,
    productDescription: Sequelize.TEXT,
    quantityInStock: Sequelize.SMALLINT,
    buyPrice: Sequelize.DECIMAL(10, 2),
    MSRP: Sequelize.DECIMAL(10, 2)
  }, {timestamps: false});
};

