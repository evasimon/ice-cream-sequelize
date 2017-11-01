// *********************************************************************************
// ice_cream_controller.js - this file offers a set of routes for 
// displaying and saving data to the db
// *********************************************************************************

// Grabbing our models
// var db = require('../models');

module.exports = function (app, db) {
    app.get('/', function (req, res) {

        db.ice_cream.findAll({ include: [db.customer] }).then(function (data) {
            console.log(data);
            var iceCream = data.filter(function (ice_cream) {
                // console.log(ice_cream.dataValues)
                return ice_cream.dataValues.devoured === false;
            })
            // console.log(iceCream);
            var iceCreamEaten = data.filter(function (ice_cream) {
                return ice_cream.dataValues.devoured === true;
            })
            // console.log(iceCreamEaten);
            res.render('index', { ice_cream: iceCream, ice_cream_eaten: iceCreamEaten });
        });
    })

    app.post('/', function (req, res) {
        db.ice_cream.create({
            ice_cream_name: req.body.ice_cream,
            devoured: false
        }).then(function () {
            res.redirect('/')
        })
    });

    app.put("/:id/:customer", function (req, res) {
        var idValue = req.params.id;
        var customerName = req.params.customer;

        db.customer.create({
            customer_name: customerName
        }).then(customer => {
            var customerId = customer.id
            db.ice_cream.update(
                {
                    devoured: true,
                    customerId: customerId
                },
                {
                    where: {
                        id: idValue
                    }
                }).then(function (result) {
                    res.json(result);
                });
        })
    });
}