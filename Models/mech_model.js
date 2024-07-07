const mongoose = require('mongoose');

const MechSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: (value) => {
                const emailRegex = /^\S+@\S+\.\S+$/;
                return emailRegex.test(value);
            },
            message: "Invalid email format",
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    isMech : {
        type : Boolean,
        default : false,
    },
    isEamil : {
        type : Boolean,
        default : false,
    },
    isShop : {
        type: Boolean,
        default: false,
    },
    shopToken : {
        type : String,
    }
});

const Mech = mongoose.model("mech-user",MechSchema);

module.exports = Mech ;