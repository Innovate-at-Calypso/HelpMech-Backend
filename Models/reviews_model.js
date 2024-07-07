const mongoose = require('mongoose');

ReviewSchema = mongoose.Schema({
    token : {
        type : String,
        required : true,
    },
    reviewsList: [{
        transactionId: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        review: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        }
    }]
});


reviewModel = mongoose.model("ReviewList",ReviewSchema);

module.exports = reviewModel;


