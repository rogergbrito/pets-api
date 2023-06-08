"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const petController_1 = __importDefault(require("../controllers/petController"));
const router = (0, express_1.Router)();
router.route("/pets").post((req, res) => petController_1.default.create(req, res));
router.route("/pets").get((req, res) => petController_1.default.getAll(req, res));
router.route("/pets/:id").get((req, res) => petController_1.default.get(req, res));
router.route("/pets/:id").delete((req, res) => petController_1.default.delete(req, res));
router.route("/pets/:id").put((req, res) => petController_1.default.update(req, res));
exports.default = router;
