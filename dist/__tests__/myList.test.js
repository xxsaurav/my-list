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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("../app")); // your Express app
const db_1 = __importDefault(require("../db/db"));
const myList_1 = require("../models/myList");
const ContentType_1 = require("../types/ContentType");
const mockConstants_1 = require("../constants/mockConstants");
describe('My List API Integration Tests', () => {
    const mockUserId = 'user_123';
    let movieId;
    let tvShowId;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, db_1.default)();
        // Insert a mock movie & tv show
        movieId = mockConstants_1.mockMovie.id;
        tvShowId = mockConstants_1.mockTVShow.id;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield myList_1.MyList.deleteMany({ userId: mockUserId });
        yield mongoose_1.default.disconnect();
        yield mongoose_1.default.connection.close();
    }));
    it('should add a movie to My List', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/mylist')
            .send({ contentId: movieId, contentType: ContentType_1.ContentType.Movie });
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Item added to My List');
    }));
    it('should not add a duplicate movie to My List', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/mylist')
            .send({ contentId: movieId, contentType: ContentType_1.ContentType.Movie });
        expect(res.status).toBe(409);
        expect(res.body.message).toMatch(/already exists/i);
    }));
    it('should add a TV show to My List', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/mylist')
            .send({ contentId: tvShowId, contentType: ContentType_1.ContentType.TVShow });
        console.log("res,b", res.body);
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Item added to My List');
    }));
    it('should list items in My List', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get('/api/mylist?page=1&limit=10');
        expect(res.status).toBe(200);
        expect(res.body.items).toBeDefined();
        expect(Array.isArray(res.body.items)).toBe(true);
    }));
    it('should remove a movie from My List', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete(`/api/mylist/${movieId}`)
            .send({ contentType: ContentType_1.ContentType.Movie });
        expect(res.status).toBe(200);
        expect(res.body.message).toMatch(/removed/i);
    }));
});
