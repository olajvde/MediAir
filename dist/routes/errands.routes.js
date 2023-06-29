"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errands_controlller_1 = require("../controllers/errands.controlller");
const router = express_1.default.Router();
router.post("/load-drone", errands_controlller_1.loadDrone);
router.post("/get-medications", errands_controlller_1.droneMedications);
exports.default = router;
