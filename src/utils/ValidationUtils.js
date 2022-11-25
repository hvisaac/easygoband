const inventoryRepository = require('../repositories/InventoryRepository');

/**
 * @param {String} id
 * @param {[{name: String, cuantity: Number}]} tradeItems
 * @returns
 */
 async function validateItems(id, tradeItems) {
    let validate = true;
    for (const item of tradeItems) {
        const validateInventory = await inventoryRepository.isAvailable(id);
        const validateItems = await inventoryRepository.ItemsInInventory(id, item);

        validate = validateInventory && validateItems;
    };

    return validate;
}

module.exports = 
{
    validateItems
}