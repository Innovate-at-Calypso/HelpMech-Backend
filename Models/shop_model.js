const mongoose = require('mongoose');

const ShopSchema = mongoose.Schema({
    location: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    shopName: {
        type: String,
        required: true,
    },
    ownerName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    shopToken: {
        type: String,
        required: true,
    },
});

const ShopModel = mongoose.model('Shop', ShopSchema);

module.exports = ShopModel;
