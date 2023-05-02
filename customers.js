// Load Express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const mongoose = require("mongoose");
require("./Customer.js");
const Customer = mongoose.model("Customer");

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://192.168.1.2:27017/customersDb', () => {
    console.log("Database connected");
});

//get Service
app.get('/', (req, res) => {
    res.send("This is customer service");
})

app.post('/customer', async (req, res) => {
    // this is our create function
    var newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    }

    // create a new customer 
    var savCustomer = new Customer(newCustomer);
    savCustomer.save().then(() => {
        console.log('New Customer created')
    }).catch((err) => {
        console.log(err)
    })
    res.send('New customer added to database');
})


app.get("/customers", (req, res) => {
    Customer.find().then((customers) => {
        res.json(customers);
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
})

app.get("/customer/:id", (req, res) => {
    Customer.findById(req.params.id).then((customer) => {
        if (customer) {
            res.json(customer)
        } else {
            res.sendStatus(404)
        }
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
})

app.delete("/customer/:id", (req, res) => {
    Customer.findByIdAndRemove(req.params.id).then(() => {
        res.send("Customer Deleted Successfully");
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
})
// listen
app.listen(4646, () => {
    console.log("Up and Running!! - Customers Service");
})
