const Order = require('../models/Order.schema');
const { ORDER_STATUS } = require('../constants');

class OrderController {
    async index(req, res) {
        const orders = await Order.find({});
        res.json(orders);
    }

    async maker(req, res) {
        try {
            const orders = await Order.find({ "maker": { '$regex': req.params.makerAddress, $options: 'i' }, state: ORDER_STATUS.PENDING});
            res.json(orders);
        } catch (error) {
            res.sendStatus(500);
        }
    }

    async taker(req, res) {
        try {
            const orders = await Order.find({ "taker" : { '$regex': req.params.takerAddress, $options: 'i' }, state: ORDER_STATUS.PENDING })
            res.json(orders);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }

    async create(req, res) {
        try {
            const order = await Order.create(req.body);
            res.json(order);
        } catch (error) {
            res.sendStatus(500);
        }
    }

    async create(req, res) {
        try {
            const newOrder = await Order.create(req.body);
            res.json(newOrder);
        } catch (error) {
            res.sendStatus(500);
        }
    }
}

module.exports = new OrderController();