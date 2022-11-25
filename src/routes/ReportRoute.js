const express = require('express');
const reportRouter = express.Router();
const { getInfecteds, getNonInfecteds, getItems, getLosedPoints } = require('../services/ReportsService');

reportRouter.get('/reports/infecteds', getInfecteds);
reportRouter.get('/reports/non-infecteds', getNonInfecteds);
reportRouter.get('/reports/items', getItems);
reportRouter.get('/reports/losed-points', getLosedPoints);

module.exports = { reportRouter };