const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
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
    isEmail : {
        type: Boolean,
        required : true,
        default: false,
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;