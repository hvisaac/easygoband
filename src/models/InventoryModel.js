const { Schema, model } = require('mongoose');

/**
 * 
 * @type { { id: String, idUser: String, water: Number, food: Number, medication: Number, ammunition: Number, available: Boolean}}
 */
const InventorySchema = new Schema({
    id: String,
    idUser: String,
    water: Number,
    food: Number,
    medication: Number,
    ammunition: Number,
    available: Boolean
});

const InventoryModel = model('INVENTORIES', InventorySchema);

module.exports = { InventorySchema, InventoryModel }