import prisma from "../middlewares/prisma";

const errandsService = {
  //* LOAD DRONE WITH MEDICATION

  async loadDrone(serialNumber: string, medications: object[], weight: number) {
    return await prisma.errands.create({
      data: {
        drone: serialNumber,
        medications,
        weight
      },
    });
  },

  //* GET MEDICATIONS LOADED ON DRONE
  async getMedicationsOnDrone(serialNumber: string) {
    return await prisma.errands.findFirst({
      where: {
        serialNumber,
        state: "LOADED" || "DELIVERING",
      },
      select: {
        medications: true,
      },
    });
  },
};

export default errandsService;
