"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAllOrders = exports.placeOrder = void 0;
const models_1 = require("../models");
const models_2 = require("../models");
const models_3 = require("../models");
const placeOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, items } = req.body; // Starting a transaction
    const t = yield models_1.sequelize.transaction();
    try {
        // Verify user exists
        const userExists = yield models_1.User.count({
            where: { id: userId },
            transaction: t,
        });
        if (!userExists)
            throw new Error("User not found");
        // Check inventory for each item
        for (const item of items) {
            const groceryItem = yield models_3.GroceryItem.findByPk(item.groceryItemId, {
                transaction: t,
            });
            if (!groceryItem)
                throw new Error(`Item not found: ${item.groceryItemId}`);
            if (groceryItem.inventoryCount < item.quantity) {
                throw new Error(`Not enough inventory for item: ${groceryItem.name}`);
            }
            groceryItem.inventoryCount -= item.quantity;
            yield groceryItem.save({ transaction: t });
        }
        // Create order
        const order = yield models_1.Order.create({ userId }, { transaction: t });
        const createdOrderItems = items.map((item) => (Object.assign(Object.assign({}, item), { orderId: order.id })));
        yield models_2.OrderItem.bulkCreate(createdOrderItems, { transaction: t });
        // If all operations were successful, commit the transaction
        yield t.commit();
        return res.status(201).json(order);
    }
    catch (error) {
        // If any operation fails, rollback the transaction
        yield t.rollback();
        throw new Error("Failed to create order");
    }
});
exports.placeOrder = placeOrder;
const listAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield models_1.Order.findAll({
        include: [{ model: models_2.OrderItem, include: [models_3.GroceryItem] }],
    });
    return res.status(200).json(orders);
});
exports.listAllOrders = listAllOrders;
