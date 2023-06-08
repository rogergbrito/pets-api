"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function main() {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_CONNECTION);
        console.log("Conectado");
    }
    catch (err) {
        console.log(`Erro: ${err}`);
    }
}
exports.default = main;
