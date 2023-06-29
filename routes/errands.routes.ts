import express from 'express'
import { loadDrone } from '../controllers/errands.controlller'

const router = express.Router()

router.post("/load-drone", loadDrone)



export default router