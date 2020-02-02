const Sequelize             = require('sequelize');
const createOrder      = require('./order');
const createOrderDetail  = require('./orderDetail');
const createProduct    = require('./product');
const createCustomer    = require('./customer');

const DATABASE = 'classicmodels';
const USERNAME = 'root';
const PASSWORD = 'rootpassword';
// establish connection
const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: false
});

// define models
const Order = createOrder(sequelize);
const OrderDetails = createOrderDetail(sequelize);
const Product = createProduct(sequelize);
const Customer = createCustomer(sequelize);

// Associations between models
Customer.hasMany(Order, {foreignKey: 'customerNumber'});
Order.hasMany(OrderDetails, {foreignKey: 'orderNumber'});
OrderDetails.belongsTo(Product, {foreignKey: 'productCode'});
// Order.belongsToMany(Inventory, {through: OrderItem});
// Inventory.belongsToMany(Order, {through: OrderItem});

module.exports = {
  sequelize: sequelize,
  Order,
  OrderDetails,
  Product,
  Customer
};
