// ice_cream_controller.js - this file offers a set of routes for 
// displaying and saving data to the db
module.exports = function (app, db) {
    // creates a get route
    app.get('/', function (req, res) {
        // looks for all ice cream including the customer data and orders the ice creams by their name
        db.ice_cream.findAll({ include: [db.customer], order: [["ice_cream_name", 'ASC']] }).then(function (data) {
            // gets all ice creams that are not eaten yet
            var iceCream = data.filter(function (ice_cream) {
                return ice_cream.dataValues.devoured === false;
            })
            // gets all ice creams that are eaten
            var iceCreamEaten = data.filter(function (ice_cream) {
                return ice_cream.dataValues.devoured === true;
            })
            // sends back the list of eaten and not eaten icecreams to index.handlebars where the HTML is renderend
            res.render('index', { ice_cream: iceCream, ice_cream_eaten: iceCreamEaten });
        });
    })
    // creates a post route
    app.post('/', function (req, res) {
        // test: res.status(400); res.send('None shall pass');
        db.ice_cream.create({
            ice_cream_name: req.body.ice_cream,
            devoured: false
        }).then(function () {
            res.redirect('/')
        })
    });
    // creates a put route
    app.put("/:id/:customer", function (req, res) {
        // test: res.status(400); res.send('None shall pass');
        var idValue = req.params.id;
        var customerName = req.params.customer;

        // creates new user
        db.customer.create({
            customer_name: customerName
        }).then(customer => {
            var customerId = customer.id
            // updates table for each ice cream record
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