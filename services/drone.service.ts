import prisma from "../middlewares/prisma";

const droneService = {
  //* CHECK FOR EXISTING DRONE BY SERIAL NUMBER
  async checkForDrone(serialNumber: string) {
    return await prisma.drone.findFirst({
      where: {
        serialNumber: serialNumber,
      },
    });
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
        battery,
      },
    });

    return newDrone;
  },

  //* GET AVAILABLE DRONES FOR LOADING
  async getAvailableDrones() {
    return await prisma.drone.findMany({
      where: {
        state: "IDLE" || "DELIVERED" || "RETURNING",
      },
    });
  },

  //* CHECK BATTERY LEVEL OF DRONE
  async checkBatteryLevel(serialNumber: string) {
    return await prisma.drone.findFirst({
      where: {
        serialNumber,
      },
      select: {
        battery: true,
      },
    });
  },

  //* UPDATE STATE OF DRONE
  async updateDrone(serialNumber: string){
    return await prisma.drone.update({
      where:{
        serialNumber: serialNumber,
      },
      data:{
        state: "LOADED"
      }
    })
  }
};

export default droneService;
