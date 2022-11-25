const inventoryRepository = require('../../repositories/InventoryRepository');
const survivorRepository = require('../../repositories/SurvivorRepository');
const { InventorySchema } = require('../../models/InventoryModel');

const getInfecteds = async () => {
    const survivors = await survivorRepository.getSurvivors()
    const infecteds = await survivorRepository.getInfecteds();
    const percentaje = (infecteds / survivors) * 100;

    return { data: { survivors: survivors, infecteds: infecteds, percentaje: percentaje + '%' }, status: 200 }
}

const getNonInfecteds = async () => {
    const survivors = await survivorRepository.getSurvivors()
    const nonInfecteds = await survivorRepository.getNonInfecteds();
    const percentaje = (nonInfecteds / survivors) * 100;

    return { data: { survivors: survivors, nonInfecteds: nonInfecteds, percentaje: percentaje + '%' }, status: 200 }
}

const getItems = async () => {
    const survivors = await survivorRepository.getNonInfecteds();

    let totalItems = {
        water: 0,
        food: 0,
        medication: 0,
        ammunition: 0
    }

    let items = await inventoryRepository.getItems();
    /**
    * @type {InventorySchema}
    */
    let item;
    for (item of items) {
        totalItems.water += item.water;
        totalItems.food += item.food;
        totalItems.medication += item.medication
        totalItems.ammunition += item.ammunition
    }

    totalItems.water = totalItems.water / survivors;
    totalItems.food = totalItems.food / survivors;
    totalItems.medication = totalItems.medication / survivors;
    totalItems.ammunition = totalItems.ammunition / survivors;

    return { data: { survivors: survivors, resourcesPerSurvivor: totalItems }, status: 200 }
}

const getLosedPoints = async () => {
    const inventories = await inventoryRepository.getLosedInventories();
    let points = 0;
    for (const inventory of inventories) {
        points += (inventory.water + inventory.food + inventory.medication + inventory.ammunition);
    }

    return { data: { losedPoints: points }, status: 200 }

}

module.exports = { getInfecteds, getNonInfecteds, getItems, getLosedPoints };