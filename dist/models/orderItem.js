"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initOrderItem = exports.OrderItem = void 0;
const sequelize_1 = require("sequelize");
class OrderItem extends sequelize_1.Model {
}
exports.OrderItem = OrderItem;
function initOrderItem(sequelize) {
    OrderItem.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        orderId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        groceryItemId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        quantity: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 1,
        },
    }, {
        tableName: "order_items",
        sequelize,
    });
}
exports.initOrderItem = initOrderItem;
