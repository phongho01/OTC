const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ORDER_STATUS } = require('../constants');

const OrderSchema = new Schema({
    expiry: { type: Number, default: 0 },
    transactionHash: { type: String, default: null },
    chainId: { type: Number, default: 1},
    nonceAndMeta: { type: String, require: true},
    maker: { type: String, require: true, indexedDB: true },
    taker: { type: String, require: true, indexedDB: true },
    takerFromMeta: { type: String, require: true, indexedDB: true },
    makerAsset: { type: String, require: true },
    takerAsset: { type: String, require: true },
    makerAmount: { type: String, require: true },
    fillableBalance: { type: String },
    swappableBalance: { type: String },
    makerBalance: { type: String },
    takerAmount: { type: String },
    signature: { type: String },
    orderHash: { type: String },
    permitMakerAsset: { type: String, default: null },
    type: { type: String },
    state: { type: String, enum: ORDER_STATUS, default: ORDER_STATUS.PENDING }
}, {
    timestamps: true
})

module.exports = mongoose.model('Order', OrderSchema);