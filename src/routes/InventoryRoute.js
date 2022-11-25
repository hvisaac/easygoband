const express = require('express');
const inventoryRouter = express.Router();
const { tradeItems } = require('../services/InventoryService');

inventoryRouter.post('/inventory/trade-items', tradeItems);

module.exports = { inventoryRouter };