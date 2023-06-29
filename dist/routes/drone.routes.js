"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const drone_controller_1 = require("../controllers/drone.controller");
const router = express_1.default.Router();
router.post("/register", drone_controller_1.registerDrone);
router.get("/available-drones", drone_controller_1.availableDrones);
router.post("/check-battery", drone_controller_1.batteryLevel);
exports.default = router;
