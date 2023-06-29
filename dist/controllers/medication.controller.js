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
exports.addMedication = void 0;
const inputValidation_1 = require("../utils/inputValidation");
const medication_service_1 = __importDefault(require("../services/medication.service"));
const addMedication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = inputValidation_1.registerMedication.validate(req.body);
        if (error) {
            // Respond with validation error if input is invalid
            return res.status(400).send({
                statusCode: 400,
                statusMessage: "Bad request",
                data: error.details[0].message,
            });
        }
        else {
            const { name, code, weight, image } = value;
            let medicationExists = yield medication_service_1.default.checkForMedication(code);
            if (medicationExists) {
                return res.status(400).send({
                    statusCode: 400,
                    statusMessage: "Medication already exists",
                });
            }
            yield medication_service_1.default
                .createMedication(name, code, weight, image)
                .then((_response) => {
                return res.status(201).send({
                    statusCode: 201,
                    statusMessage: "Medication Registered",
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
exports.addMedication = addMedication;
