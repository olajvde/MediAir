import express from 'express'
import { addMedication } from '../controllers/medication.controller'

const router = express.Router()

router.post("/register", addMedication)



export default router