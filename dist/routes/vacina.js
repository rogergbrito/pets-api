"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vacinaController_1 = __importDefault(require("../controllers/vacinaController"));
const router = (0, express_1.Router)();
router.route("/vacinas").post((req, res) => vacinaController_1.default.create(req, res));
router.route("/vacinas").get((req, res) => vacinaController_1.default.getAll(req, res));
router.route("/vacinas/:id").get((req, res) => vacinaController_1.default.get(req, res));
router.route("/vacinas/:id").delete((req, res) => vacinaController_1.default.delete(req, res));
router.route("/vacinas/:id").put((req, res) => vacinaController_1.default.update(req, res));
exports.default = router;
