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
exports.loadDrone = void 0;
const drone_service_1 = __importDefault(require("../services/drone.service"));
const errands_service_1 = __importDefault(require("../services/errands.service"));
const medication_service_1 = __importDefault(require("../services/medication.service"));
const loadDrone = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { serialNumber, medications } = req.body;
    try {
        //* CHECK IF DRONE EXISTS
        let droneExists = yield drone_service_1.default.checkForDrone(serialNumber);
        if (!droneExists) {
            return res.status(400).send({
                statusCode: 400,
                statusMessage: "Drone Does Not exist",
            });
        }
        if (droneExists) {
            if (droneExists.battery < 25) {
                return res.status(400).send({
                    statusCode: 400,
                    statusMessage: "Drone Battery Too Low",
                });
            }
            console.log(droneExists);
            if (droneExists.state !== "IDLE") {
                return res.status(400).send({
                    statusCode: 400,
                    statusMessage: "Drone Unavailable",
                });
            }
        }
        // * check medication weight
        medications.forEach((medication) => __awaiter(void 0, void 0, void 0, function* () {
            if (medication.weight > droneExists.weight) {
                return res.status(400).send({
                    statusCode: 400,
                    statusMesssage: `${medication.name} is too heavy`,
                });
            }
            const medicationExists = yield medication_service_1.default.checkForMedication(medication.code);
            console.log(medicationExists);
            if (!medicationExists) {
                return res.status(400).send({
                    statusCode: 400,
                    statusMesssage: `${medication.name} does not exist`,
                });
            }
        }));
        //* check collective medication weight
        const reducedWeight = medications.reduce((totalWeight, medication) => {
            // console.log(medication)
            return totalWeight + medication.weight;
        }, 0);
        if (reducedWeight > droneExists.weight) {
            return res.status(400).send({
                statusCode: 400,
                statusMessage: "Collective Weight of Medications Too Heavy",
            });
        }
        yield errands_service_1.default
            .loadDrone(serialNumber, medications, reducedWeight)
            .then((_response) => __awaiter(void 0, void 0, void 0, function* () {
            yield drone_service_1.default.updateDrone(serialNumber);
            return res.status(200).send({
                statusCode: 200,
                statusMessage: "Drone Loaded",
            });
        }))
            .catch((error) => {
            next(error);
        });
    }
    catch (error) {
        next(error);
    }
});
exports.loadDrone = loadDrone;
