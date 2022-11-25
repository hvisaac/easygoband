const { SurvivorSchema } = require('../SurvivorModel');
const { InventorySchema } = require('../InventoryModel');

/**
 * 
 * @type { {data:{survivor: SurvivorSchema, inventory: InventorySchema}, status: Number} }
 */
const SurvivorResponseModel = {
    data: {
        survivor: SurvivorSchema,
        inventory: InventorySchema,    
    },
    status: Number
}

module.exports = { SurvivorResponseModel }