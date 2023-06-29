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
exports.registerDrone = void 0;
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
            const { serialNumber, model, weight, batteryCapacity } = req.body;
            yield drone_service_1.default
                .registerDrone(serialNumber, model, weight, batteryCapacity)
                .then((response) => {
                res.send(response);
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
