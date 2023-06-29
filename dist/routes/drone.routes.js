"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const drone_controller_1 = require("../controllers/drone.controller");
const router = express_1.default.Router();
router.post("/register", drone_controller_1.registerDrone);
exports.default = router;
