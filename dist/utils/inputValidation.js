"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMedication = exports.droneRegistration = void 0;
const joi_1 = __importDefault(require("joi"));
const droneRegistration = joi_1.default.object({
    serialNumber: joi_1.default.string().required().max(100),
    model: joi_1.default.string().required().valid('Lightweight', 'Middleweight', 'Cruiseweight', 'Heavyweight'),
    weight: joi_1.default.number().required().max(500),
    batteryCapacity: joi_1.default.number().required().max(100).min(0),
    state: joi_1.default.string().valid("IDLE", "LOADING", "LOADED", "DELIVERING", "DELIVERED", "RETURNING")
});
exports.droneRegistration = droneRegistration;
const registerMedication = joi_1.default.object({
    name: joi_1.default.string().required().pattern(/^[A-Za-z0-9\-_]+$/),
    weight: joi_1.default.number().required().max(500),
    code: joi_1.default.string().required().pattern(/^[A-Z0-9_]+$/),
    image: joi_1.default.string().required()
});
exports.registerMedication = registerMedication;
