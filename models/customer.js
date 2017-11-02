module.exports = function (sequelize, DataTypes) {
    var Customer = sequelize.define("customer", {
        // giving the Customer model a name of type STRING
        customer_name: {
            type: DataTypes.STRING,
            allowNull: false,
            // the Customer's name cannot be null
            validate: {
                len: [1, 50]
            }
        }
    });

    Customer.associate = function (models) {
        // Associating Customers with ice_cream
        // When a Customer is deleted, also delete any associated ice_cream
        Customer.hasMany(models.ice_cream, {
            onDelete: "cascade"
        });
    };

    return Customer;
};