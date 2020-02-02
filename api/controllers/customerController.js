const Models = require('../models');
const Customer = Models.Customer;
const Order = Models.Order;
const OrderDetails = Models.OrderDetails;
const Product = Models.Product;

const index = async function(req, res, next) {
  try {
    const customers = await Customer.findAll();

    res.send({
      customers
    });
  } catch (e) {
    console.log(e.message);
    next(e);
  }
}

const show = async function(req, res, next) {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findByPk(customerId, {
      include: [Order]
    });

    res.send(customer)
  } catch (e) {
    next(e);
  }
}

const showOrder = async function(req, res, next) {
  try {
    const customerId = req.params.id;
    const orders = await Order.findAll({
      where: {
        customerNumber: customerId
      }
    })
    res.send(orders)
  } catch (e) {
    next(e);
  }
}

const showOrderDetails = async function(req, res, next) {
  try {
    const orderId = req.params.orderId;
    const orderDetails = await OrderDetails.findAll({
      where: {
        orderNumber: orderId
      },
      include: [Product]
    })
    res.send(orderDetails)
  } catch (e) {
    next(e);
  }
}

module.exports = {
  index,
  show,
  showOrder,
  showOrderDetails
}