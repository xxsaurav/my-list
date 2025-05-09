"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initOrder = exports.Order = void 0;
const sequelize_1 = require("sequelize");
class Order extends sequelize_1.Model {
}
exports.Order = Order;
function initOrder(sequelize) {
    Order.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    }, {
        tableName: "orders",
        sequelize,
    });
}
exports.initOrder = initOrder;
