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
exports.listUserOrders = exports.getAllUsers = exports.createUser = void 0;
const user_1 = require("../models/user");
const models_1 = require("../models");
const models_2 = require("../models");
const models_3 = require("../models");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.User.create(req.body);
    return res.status(201).json(user);
});
exports.createUser = createUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.User.findAll();
    return res.status(201).json(users);
});
exports.getAllUsers = getAllUsers;
const listUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const orders = yield models_2.Order.findAll({
        where: { userId },
        include: [{ model: models_3.OrderItem, include: [models_1.GroceryItem] }],
    });
    return res.status(200).json(orders);
});
exports.listUserOrders = listUserOrders;
