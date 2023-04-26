const Order = require('../models/Order.schema');

class OrderController {
    async index(req, res) {
        const orders = await Order.find({});
        res.json(orders);
    }

    async maker(req, res) {
        try {
            const orders = await Order.find({ maker: req.params.makerAddress })
            res.json(orders);
        } catch (error) {
            res.sendStatus(500);
        }
    }

    async taker(req, res) {
        try {
            const orders = await Order.find({ taker: req.params.takerAddress })
            res.json(orders);
        } catch (error) {
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
}

module.exports = new OrderController();