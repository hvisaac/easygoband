const inventoryRepository = require('../../repositories/InventoryRepository');
const validationUtils = require('../../utils/ValidationUtils');
const { TradeModel } = require('../../models/TradeModel');
const { priceTable } = require('../../utils/enums/PriceTable'); 

/**
 * 
 * @param {TradeModel} trade 
 */
async function tradeItems(trade){

    const aValidateItems = await validationUtils.validateItems(trade.aSurvivor.id, trade.aSurvivor.items);
    const bValidateItems = await validationUtils.validateItems(trade.bSurvivor.id, trade.bSurvivor.items);
    let survivorsTrading;
    let message;
    let code = 200;

    if(aValidateItems && bValidateItems){
        if(countItemPoints(trade.aSurvivor.items) == countItemPoints(trade.bSurvivor.items)){
            survivorsTrading = await inventoryRepository.tradeItems(trade).then(survivorsTrade => {
                if(survivorsTrade) {
                    message = 'successful trade';
                } else { message = 'failed trade'; }
                return survivorsTrade;
            });
        } else {
            survivorsTrading = false;
            message = 'No points to trade';
            code = 203
        }
    } else {
        survivorsTrading = false;
        message = 'insufficient resource or infected survivor';
        code = 203
    }

    return { data: {trade: survivorsTrading, message: message}, status: code }
}

/**
 * 
 * @param {[{name: String, cuantity: Number}]} tradeItems
 */
function countItemPoints(tradeItems){
    let points = 0;
    for(const item of tradeItems){
        if(item.name == 'water') {
            points += item.cuantity * priceTable.water;
        }
        if(item.name == 'food') {
            points += item.cuantity * priceTable.food;
        }
        if(item.name == 'medication') {
            points += item.cuantity * priceTable.medication;
        }
        if(item.name == 'ammunition') {
            points += item.cuantity * priceTable.ammunition;
        }
    }

    return points;
}

module.exports = { tradeItems };