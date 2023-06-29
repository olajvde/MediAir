import { Request, Response, NextFunction } from "express";
import { droneRegistration } from "../utils/inputValidation";
import droneService from "../services/drone.service";

const registerDrone = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Validate req.body against the schema

  try {
    const { error, value } = droneRegistration.validate(req.body);
    if (error) {
      // Respond with validation error if input is invalid
      return res.status(400).send({
        statusCode: 400,
        statusMessage: "Bad request",
        data: error.details[0].message,
      });
    } else {
      // Process the validated data if input is valid
      // ...
      const { serialNumber, model, weight, batteryCapacity } = value;

      let droneExists = await droneService.checkForDrone(serialNumber);

      if (droneExists) {
        return res.status(400).send({
          statusCode: 400,
          statusMessage: "Drone already exists",
        });
      }

      await droneService
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
  } catch (error) {
    next(error);
  }
};

//* GET AVAILABLE DRONES
const availableDrones = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await droneService
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
  } catch (error) {
    next(error);
  }
};

//* CHECK BATTERY LEVEL OF A DRONE
const batteryLevel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { serialNumber } = req.body;
  try {
    let droneExists = await droneService.checkForDrone(serialNumber);

    if (!droneExists) {
      return res.status(400).send({
        statusCode: 400,
        statusMessage: "Drone does not exist",
      });
    }

    await droneService
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
  } catch (error) {
    next(error);
  }
};

export { registerDrone, availableDrones, batteryLevel };
