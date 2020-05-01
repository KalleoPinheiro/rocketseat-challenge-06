"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var routes_1 = __importDefault(require("./routes"));
var database_1 = __importDefault(require("./database"));
var ExceptionGlobalMiddleware_1 = __importDefault(require("./middlewares/ExceptionGlobalMiddleware"));
database_1.default();
var app = express_1.default();
app.use(express_1.default.json());
app.use(routes_1.default);
app.use(ExceptionGlobalMiddleware_1.default);
exports.default = app;
