"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pets_1 = __importDefault(require("./pets"));
const vacina_1 = __importDefault(require("./vacina"));
const router = (0, express_1.Router)();
router.use('/', pets_1.default);
router.use('/', vacina_1.default);
exports.default = router;
