"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var TransactionsController_1 = __importDefault(require("../controllers/TransactionsController"));
var transactionsRouter = express_1.Router();
transactionsRouter.post('/', TransactionsController_1.default.store);
// transactionsRouter.post('/', async (request, response) => {
//   // TODO
// });
// transactionsRouter.delete('/:id', async (request, response) => {
//   // TODO
// });
// transactionsRouter.post('/import', async (request, response) => {
//   // TODO
// });
exports.default = transactionsRouter;
