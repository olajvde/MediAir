import Joi from 'joi';

const droneRegistration = Joi.object({
    serialNumber: Joi.string().required().max(100),
    model: Joi.string().required().valid('Lightweight', 'Middleweight', 'Cruiseweight', 'Heavyweight'),
    weight: Joi.number().required().max(500),
    batteryCapacity: Joi.number().required().max(100).min(0),
    state:  Joi.string().valid("IDLE","LOADING","LOADED", "DELIVERING","DELIVERED","RETURNING")
})


const registerMedication = Joi.object({
    name : Joi.string().required().pattern(/^[A-Za-z0-9\-_]+$/),
    weight: Joi.number().required().max(500),
    code: Joi.string().required().pattern(/^[A-Z0-9_]+$/),
    image: Joi.string().required()

})


export {
    droneRegistration,
    registerMedication
}