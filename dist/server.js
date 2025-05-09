"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./db/db"));
const PORT = process.env.PORT || 3333;
(0, db_1.default)();
app_1.default.listen(PORT, () => console.log(`Server running on port ${PORT}`));
