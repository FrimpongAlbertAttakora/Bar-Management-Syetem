const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    drink_type: {
        type: String,
        require: true
    },
    drink_stock: {
        type: Array(Number),
        require: true
    },
    drink_stock_total: {
        type: Number,
        require: true
    },
    drink_price: {
        type: Number,
        require: true
    },
    drink_sale: {
        type: Array(Number),
        require: true
    },
    drink_sale_total: {
        type: Number,
        require: true
    }
});

module.exports = mongoose.model('barItems', ItemSchema);