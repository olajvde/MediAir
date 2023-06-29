"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../middlewares/prisma"));
const droneService = {
    //* CHECK FOR EXISTING DRONE BY SERIAL NUMBER
    checkForDrone(serialNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.drone.findFirst({
                where: {
                    serialNumber: serialNumber,
                },
            });
        });
    },
    //* REGISTER DRONE
    registerDrone(serialNumber, model, weight, battery) {
        return __awaiter(this, void 0, void 0, function* () {
            const newDrone = yield prisma_1.default.drone.create({
                data: {
                    serialNumber,
                    model,
                    weight,
                    battery,
                },
            });
            return newDrone;
        });
    },
    //* GET AVAILABLE DRONES FOR LOADING
    getAvailableDrones() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.drone.findMany({
                where: {
                    state: "IDLE" || "DELIVERED" || "RETURNING",
                },
            });
        });
    },
    //* CHECK BATTERY LEVEL OF DRONE
    checkBatteryLevel(serialNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.drone.findFirst({
                where: {
                    serialNumber,
                },
                select: {
                    battery: true,
                },
            });
        });
    },
};
exports.default = droneService;
