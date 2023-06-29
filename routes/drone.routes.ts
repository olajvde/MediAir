import express from "express";
import {
  availableDrones,
  batteryLevel,
  registerDrone,
} from "../controllers/drone.controller";

const router = express.Router();

router.post("/register", registerDrone);
router.get("/available-drones", availableDrones);
router.post("/check-battery", batteryLevel);

export default router;
