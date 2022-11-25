/**
 * @type {{aSurvivor: {id: String, items: [{name: String, cuantity: Number,}]}, bSurvivor: {id: String, items: [{name: String, cuantity: Number,}]}}}
 */
const TradeModel = {
    aSurvivor: {
        id: String,
        items: [{
            name: String,
            cuantity: Number
        }]
    },
    bSurvivor: {
        id: String,
        items: [{
            name: String,
            cuantity: Number
        }]
    },
}

module.exports = { TradeModel }