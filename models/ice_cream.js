// creates an Icecream model and
// adds validation to the model
module.exports = function (sequelize, DataTypes) {
    var Icecream = sequelize.define("ice_cream", {
        ice_cream_name: {
            allowNull: false,
            type: DataTypes.STRING,
            // the ice_cream's name cannot be null
            validate: {
                len: [1, 50]
            }
        },
        devoured: {
            type: DataTypes.BOOLEAN,
            // an ice cream's devoured status is false by default
            defaultValue: false
        }
    });

    Icecream.associate = function (models) {
        // each Ice-Cream should belong to a Customer
        // ice cream can't be eaten without a Customer Name due to the foreign key constraint
        Icecream.belongsTo(models.customer, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Icecream;

};