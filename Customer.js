const mongoose = require("mongoose");

// Model for a Customers
mongoose.model("Customer", {
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: false
    }
});