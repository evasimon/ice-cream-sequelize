// creates a Icecream model
module.exports = function (sequelize, DataTypes) {
    return sequelize.define("ice_cream", {
        ice_cream_name: DataTypes.STRING,
        devoured: DataTypes.BOOLEAN
    });
};