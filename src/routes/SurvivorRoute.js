const express = require('express');
const survivorRouter = express.Router();
const { addSurvivor, updateSurvivor, flagSurvivor } = require('../services/SurvivorService');

survivorRouter.post('/survivors/add-survivor', addSurvivor);
survivorRouter.put('/survivors/update-survivor-location/:id', updateSurvivor);
survivorRouter.post('/survivors/flag-survivor', flagSurvivor);

module.exports = { survivorRouter };