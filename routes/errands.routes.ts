import express from "express";
import {
  droneMedications,
  loadDrone,
} from "../controllers/errands.controlller";

const router = express.Router();

router.post("/load-drone", loadDrone);

router.post("/get-medications", droneMedications);

export default router;
