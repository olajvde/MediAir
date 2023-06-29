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
exports.batteryLevel = exports.availableDrones = exports.registerDrone = void 0;
const inputValidation_1 = require("../utils/inputValidation");
const drone_service_1 = __importDefault(require("../services/drone.service"));
const registerDrone = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate req.body against the schema
    try {
        const { error, value } = inputValidation_1.droneRegistration.validate(req.body);
        if (error) {
            // Respond with validation error if input is invalid
            return res.status(400).send({
                statusCode: 400,
                statusMessage: "Bad request",
                data: error.details[0].message,
            });
        }
        else {
            // Process the validated data if input is valid
            // ...
            const { serialNumber, model, weight, batteryCapacity } = value;
            let droneExists = yield drone_service_1.default.checkForDrone(serialNumber);
            if (droneExists) {
                return res.status(400).send({
                    statusCode: 400,
                    statusMessage: "Drone already exists",
                });
            }
            yield drone_service_1.default
                .registerDrone(serialNumber, model, weight, batteryCapacity)
                .then((_response) => {
                return res.status(201).send({
                    statusCode: 201,
                    statusMessage: "Drone Registered",
                });
            })
                .catch((error) => {
                next(error);
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.registerDrone = registerDrone;
//* GET AVAILABLE DRONES
const availableDrones = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield drone_service_1.default
            .getAvailableDrones()
            .then((response) => {
            return res.status(200).send({
                statusCode: 200,
                statusMessage: "Available Drones",
                data: response,
            });
        })
            .catch((error) => {
            next(error);
        });
    }
    catch (error) {
        next(error);
    }
});
exports.availableDrones = availableDrones;
//* CHECK BATTERY LEVEL OF A DRONE
const batteryLevel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { serialNumber } = req.body;
    try {
        let droneExists = yield drone_service_1.default.checkForDrone(serialNumber);
        if (!droneExists) {
            return res.status(400).send({
                statusCode: 400,
                statusMessage: "Drone does not exist",
            });
        }
        yield drone_service_1.default
            .checkBatteryLevel(serialNumber)
            .then((response) => {
            return res.status(200).send({
                statusCode: 200,
                statusMessage: "Available Drones",
                data: response,
            });
        })
            .catch((error) => {
            next(error);
        });
    }
    catch (error) {
        next(error);
    }
});
exports.batteryLevel = batteryLevel;
