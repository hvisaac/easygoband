const { InventorySchema, InventoryModel } = require('../models/InventoryModel');
const itemUtils = require('../utils/ItemUtils');
const { TradeModel } = require('../models/TradeModel');

/**
 * 
 * @param {InventorySchema} inventory
 * @param {String} id 
 * @returns
 */
function addInventory(inventory, id) {
    inventory.idUser = id;
    inventory.available = true;
    console.log(inventory)
    const inventoryModel = new InventoryModel(inventory);

    const response = new Promise((next) => {
        inventoryModel.save((err, docs) => {
            if (err) {
                next(err);
            }
            else {
                next(docs);
            }
        });
    });

    return response;

}

/**
 * 
 * @param {String} idUser 
 */
function isAvailable(idUser) {
    const validateInventory = new Promise((next) => {
        InventoryModel.findOne({idUser: idUser}, (err, docs) => {
            if (err) { next(err) }
            else { next(docs.available); }
        });
    });

    return validateInventory;
}

/**
 * @param {String} id
 * @param {[{name: String, cuantity: Number}]} item
 * @returns
 */
function ItemsInInventory(id, item) {

    const exist = new Promise((next) => {
        InventoryModel.findOneAndUpdate({idUser: id}, item.name, (err, docs) => {
            if (err) { console.log(err) }
            if (docs.water < item.cuantity && item.name == 'water') {
                next(false);
            }
            if (docs.food < item.cuantity && item.name == 'food') {
                next(false);
            }
            if (docs.medication < item.cuantity && item.name == 'medication') {
                next(false);
            }
            if (docs.ammunition < item.cuantity && item.name == 'ammunition') {
                next(false);
            }
            next(true);
        });
    });

    return exist;
}

/**
 * 
 * @param {TradeModel} trade 
 * @returns 
 */
async function tradeItems(trade) {
    const addAItems = itemUtils.formatAddItems(trade.bSurvivor.items);
    const deleteAItems = itemUtils.formatDeleteItems(trade.aSurvivor.items);
    const aItems = itemUtils.joinItems(addAItems, deleteAItems);

    const addBItems = itemUtils.formatAddItems(trade.aSurvivor.items);
    const deleteBItems = itemUtils.formatDeleteItems(trade.bSurvivor.items);
    const bItems = itemUtils.joinItems(addBItems, deleteBItems);


    console.log(aItems);
    console.log(bItems);

    const aTrade = await survivorsTrading(trade.aSurvivor.id, aItems);
    const bTrade = await survivorsTrading(trade.bSurvivor.id, bItems);

    return aTrade && bTrade;
}

/**
 * 
 * @param {String} id 
 * @param {{water: Number, food: Number, medication: Number, ammunition: Number}} items 
 * @returns 
 */
function survivorsTrading(id, items) {
    const response = new Promise((next) => {
        InventoryModel.findOneAndUpdate({idUser: id}, {
            $inc: {
                water: items.water,
                food: items.food,
                medication: items.medication,
                ammunition: items.ammunition
            }
        },
            (err) => {
                if (err) {
                    next(false)
                } else {
                    next(true)
                }
            })
    })

    return response;
}

/**
 * 
 * @param {String} id 
 * @returns 
 */
function disableInventory(id){
    const inventory = new Promise((next) => {
        InventoryModel.findOneAndUpdate({idUser: id}, {available: false}, (err, docs) => {
            if (err) { next(err) }
            else { next(docs) }
        });
    })

    return inventory;

}

const getItems = () => {
    const inventories = new Promise((next) => {
        InventoryModel.find({available: true}, {available: 0}, (err, docs) => {
            if (err) { next(err) }
            else { next(docs) }
        });
    })

    return inventories
}

const getLosedInventories = () => {
    /**
     * @type {[InventorySchema]}
     */
    const inventories = new Promise((next) => {
        InventoryModel.find({available: false}, {available: 0, idUser: 0}, (err, docs) => {
            if (err) { next(err) }
            else { next(docs) }
        });
    });

    return inventories;
}

module.exports = 
{ 
    addInventory, 
    ItemsInInventory, 
    tradeItems, 
    disableInventory,
    getItems,
    getLosedInventories,
    isAvailable
 };