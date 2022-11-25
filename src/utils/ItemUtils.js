/**
 * 
 * @param {[{name: String, cuantity: Number}]} items 
 */
 function formatAddItems(items) {
    let formatItems = {
        water: 0,
        food: 0,
        medication: 0,
        ammunition: 0
    };

    for (const item of items) {
        if (item.name == "water") {
            formatItems.water += item.cuantity;
        }
        if (item.name == "food") {
            formatItems.food += item.cuantity;
        }
        if (item.name == "medication") {
            formatItems.medication += item.cuantity;
        }
        if (item.name == "ammunition") {
            formatItems.ammunition += item.cuantity;
        }
    }

    return formatItems;
}

/**
 * 
 * @param {[{name: String, cuantity: Number}]} items 
 */
function formatDeleteItems(items) {
    let formatItems = {
        water: 0,
        food: 0,
        medication: 0,
        ammunition: 0
    };

    for (const item of items) {
        if (item.name == "water") {
            formatItems.water -= item.cuantity;
        }
        if (item.name == "food") {
            formatItems.food -= item.cuantity;
        }
        if (item.name == "medication") {
            formatItems.medication -= item.cuantity;
        }
        if (item.name == "ammunition") {
            formatItems.ammunition -= item.cuantity;
        }
    }

    return formatItems;
}

/**
 * 
 * @param {{water: Number, food: Number, medication: Number, ammunition: Number}} addedItems 
 * @param {{water: Number, food: Number, medication: Number, ammunition: Number}} deletedItems 
 */
function joinItems(addedItems, deletedItems) {
    let formatItems = {
        water: addedItems.water + deletedItems.water,
        food: addedItems.food + deletedItems.food,
        medication: addedItems.medication + deletedItems.medication,
        ammunition: addedItems.ammunition + deletedItems.ammunition
    };



    return formatItems;
}

module.exports = 
{
    formatAddItems,
    formatDeleteItems,
    joinItems,
}