"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockAuthMiddleware = void 0;
// This simulates an authenticated user.
const mockAuthMiddleware = (req, res, next) => {
    req.user = { id: "user_123" }; // Hardcoded for assignment/testing
    next();
};
exports.mockAuthMiddleware = mockAuthMiddleware;
