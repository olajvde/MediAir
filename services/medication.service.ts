import prisma from "../middlewares/prisma";

const medicationService = {
  //* CHECK TO SEE IF MEDICATION EXISTS WITH CODE
  async checkForMedication(code: string) {
    return await prisma.medication.findFirst({
      where: {
        code: code,
      },
    });
  },

  //* CREATE MEDICATION

  async createMedication(
    name: string,
    code: string,
    weight: number,
    image: string
  ) {
    return await prisma.medication.create({
      data: {
        name,
        weight,
        code,
        image,
      },
    });
  },
};

export default medicationService;
