const inventoryServiceImpl = require('./impl/InventoryServiceImpl');

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const tradeItems = async (req, res) => {
    await inventoryServiceImpl.tradeItems(req.body)
        .then(response => {
            res.status(response.status).json(response)
        });
}

module.exports = { tradeItems };