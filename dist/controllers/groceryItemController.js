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
exports.manageInventory = exports.removeGroceryItem = exports.viewGroceryItems = exports.updateGroceryItem = exports.addGroceryItem = exports.listGroceryItems = void 0;
const models_1 = require("../models");
const listGroceryItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield models_1.GroceryItem.findAll();
    return res.status(200).json(items);
});
exports.listGroceryItems = listGroceryItems;
const addGroceryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield models_1.GroceryItem.create(req.body);
    return res.status(201).json(item);
});
exports.addGroceryItem = addGroceryItem;
const updateGroceryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const [updated] = yield models_1.GroceryItem.update(req.body, { where: { id } });
    if (updated) {
        const updatedItem = yield models_1.GroceryItem.findOne({ where: { id } });
        return res.status(200).json(updatedItem);
    }
    throw new Error("Grocery item not found");
});
exports.updateGroceryItem = updateGroceryItem;
const viewGroceryItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield models_1.GroceryItem.findAll();
    return res.status(200).json(items);
});
exports.viewGroceryItems = viewGroceryItems;
const removeGroceryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deleted = yield models_1.GroceryItem.destroy({ where: { id } });
    if (deleted) {
        return res.status(204).send();
    }
    throw new Error("Grocery item not found");
});
exports.removeGroceryItem = removeGroceryItem;
const manageInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, inventoryCount } = req.body;
    const [updated] = yield models_1.GroceryItem.update({ inventoryCount }, { where: { id } });
    if (updated) {
        const updatedItem = yield models_1.GroceryItem.findOne({ where: { id } });
        return res.status(200).json(updatedItem);
    }
    throw new Error("Grocery item not found");
});
exports.manageInventory = manageInventory;
