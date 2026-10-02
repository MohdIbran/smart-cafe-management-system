const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const customerSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: true,
        unique: true,
    },

    address: {
        type: String,
        trim: true
    },

}, {
    timestamps: true,
});

customerSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const customerModel = mongoose.model("Customer", customerSchema);

module.exports = customerModel;