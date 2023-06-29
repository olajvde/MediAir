import prisma from "../middlewares/prisma";

const droneService = {

  //* CHECK FOR EXISTING DRONE BY SERIAL NUMBER
  async checkForDrone(serialNumber: string){
    return await prisma.drone.findFirst({
      where:{
        serialNumber: serialNumber
      }
    })
  },
    //* REGISTER DRONE
  async registerDrone(
    serialNumber: string,
    model: string,
    weight: number,
    battery: number
  ) {
    const newDrone = await prisma.drone.create({
      data: {
        serialNumber,
        model,
        weight,
        battery
      },
    });

    return newDrone;
  },
};

export default droneService;
