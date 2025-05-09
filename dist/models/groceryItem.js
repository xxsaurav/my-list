"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initGroceryItem = exports.GroceryItem = void 0;
const sequelize_1 = require("sequelize");
class GroceryItem extends sequelize_1.Model {
}
exports.GroceryItem = GroceryItem;
function initGroceryItem(sequelize) {
    try {
        console.log("Initializing grocery item model...");
        GroceryItem.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: new sequelize_1.DataTypes.STRING(128),
                allowNull: false,
            },
            description: {
                type: new sequelize_1.DataTypes.STRING(255),
                allowNull: true,
            },
            price: {
                type: sequelize_1.DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            inventoryCount: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
            },
        }, {
            tableName: "grocery_items",
            sequelize,
        });
        console.log("Grocery item model initialized successfully.");
    }
    catch (error) {
        console.error("Error initializing grocery item model:", error);
    }
}
exports.initGroceryItem = initGroceryItem;
