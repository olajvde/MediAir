import { Request, Response, NextFunction } from "express";
import { registerMedication } from "../utils/inputValidation";
import medicationService from "../services/medication.service";

const addMedication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = registerMedication.validate(req.body);

    if (error) {
      // Respond with validation error if input is invalid
      return res.status(400).send({
        statusCode: 400,
        statusMessage: "Bad request",
        data: error.details[0].message,
      });
    } else {
      const { name, code, weight, image } = value;

      let medicationExists = await medicationService.checkForMedication(code);

      if (medicationExists) {
        return res.status(400).send({
          statusCode: 400,
          statusMessage: "Medication already exists",
        });
      }

      await medicationService
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
  } catch (error) {
    next(error);
  }
};



export { addMedication }