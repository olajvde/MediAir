import { Request, Response, NextFunction } from "express";
import droneService from "../services/drone.service";
import errandsService from "../services/errands.service";
import medicationService from "../services/medication.service";

const loadDrone = async (req: Request, res: Response, next: NextFunction) => {
  const { serialNumber, medications } = req.body;

  try {
    //* CHECK IF DRONE EXISTS
    let droneExists = await droneService.checkForDrone(serialNumber);

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
    medications.forEach(async (medication: any) => {
      if (medication.weight > droneExists.weight) {
        return res.status(400).send({
          statusCode: 400,
          statusMesssage: `${medication.name} is too heavy`,
        });
      }

      const medicationExists = await medicationService.checkForMedication(
        medication.code
      );

      console.log(medicationExists);
      if (!medicationExists) {
        return res.status(400).send({
          statusCode: 400,
          statusMesssage: `${medication.name} does not exist`,
        });
      }
    });

    //* check collective medication weight
    const reducedWeight = medications.reduce(
      (totalWeight: number, medication: any) => {
        // console.log(medication)
        return totalWeight + medication.weight;
      },
      0
    );

    if (reducedWeight > droneExists.weight) {
      return res.status(400).send({
        statusCode: 400,
        statusMessage: "Collective Weight of Medications Too Heavy",
      });
    }

    await errandsService
      .loadDrone(serialNumber, medications, reducedWeight)
      .then(async (_response) => {
        await droneService.updateDrone(serialNumber);
        return res.status(200).send({
          statusCode: 200,
          statusMessage: "Drone Loaded",
        });
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
};

//* GET MEDICATIONS LOADED ON DRONE
const droneMedications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { serialNumber } = req.body;

  try {
    //* CHECK IF DRONE EXISTS
    let droneExists = await droneService.checkForDrone(serialNumber);

    if (!droneExists) {
      return res.status(400).send({
        statusCode: 400,
        statusMessage: "Drone Does Not exist",
      });
    }

    const medications = await errandsService.getMedicationsOnDrone(
      serialNumber
    );
    // console.table(medications)
    return res.status(200).send({
      statusCode: 200,
      statusMessage: "Drone Fetched",
      data: medications,
    });
  } catch (error) {
    next(error);
  }
};

export { loadDrone, droneMedications };
