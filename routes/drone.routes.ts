import express, {Request, Response} from 'express'
import { registerDrone } from '../controllers/drone.controller'

const router = express.Router()

router.post("/register", registerDrone)



export default router