import { model } from "@prisma/client";
import prisma from "../middlewares/prisma";

const droneService = {

    //* REGISTER DRONE
  async registerDrone(
    serialNumber: string,
    model: model,
    weight: number,
    battery: number
  ) {
    const newDrone = await prisma.drone.create({
      serialNumber,
      model,
      weight,
      battery,
    });

    return newDrone;
  },
};

export default droneService;
