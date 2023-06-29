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
      const { serialNumber, model, weight, batteryCapacity } = req.body;
      await droneService
        .registerDrone(serialNumber, model, weight, batteryCapacity)
        .then((response) => {
          res.send(response);
        })
        .catch((error) => {
          next(error);
        });
    }
  } catch (error) {
    next(error);
  }
};

export { registerDrone };
