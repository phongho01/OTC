const cron = require('node-cron');
const Order = require('../models/Order.schema');
const { ORDER_STATUS } = require('../constants');

const orderJob = cron.schedule('*/30 * * * * *', async () => {
  const dateNow = Date.now() / 1000;
  const orders = await Order.find({ $and: [
    { expiry: { $ne: 0 } },
    { expiry: { $lt: dateNow } }
  ] });
  for(let i = 0; i < orders.length; i++) {
    await Order.findOneAndUpdate({ _id: orders[i]._id }, { state: ORDER_STATUS.EXPIRATION })
  }
  
});

module.exports = { orderJob };