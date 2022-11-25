const survivorRepository = require('../../repositories/SurvivorRepository');
const inventorRepository = require('../../repositories/InventoryRepository');
const { SurvivorSchema } = require('../../models/SurvivorModel');
const { InventorySchema } = require('../../models/InventoryModel');
const { InfectedReportSchema } = require('../../models/InfectedReportModel');
const { SurvivorResponseModel } = require('../../models/responses/addSurvivorResponseModel');
const { updatedSurvivorResponseModel } = require('../../models/responses/updateSurvivorResponseModel');
const { flagSurvivorResponseModel } = require('../../models/responses/flagSurvivorResponseModel');

/**
 * 
 * @param {SurvivorSchema} survivorRequest 
 * @param {InventorySchema} inventoryRequest
 * @returns 
 */
async function addSurvivor(survivorRequest, inventoryRequest) {

    try {
        const survivor = await survivorRepository.addSurvivor(survivorRequest);
        const inventory = await inventorRepository.addInventory(inventoryRequest, survivor._id);

        /**
        * @type {SurvivorResponseModel}
        */
        const response = {
            data: {
                survivor: survivor,
                inventory: inventory,
            },
            status: 201
        };

        return response;

    } catch (error) {
        return error;
    }


}

/**
 * 
 * @param {import('mongoose').ObjectId} id 
 * @param {Number} latitude
 * @param {Number} longitude
 * @returns
 */
async function updateSurvivor(id, latitude, longitude) {
    try {
        const survivor = await survivorRepository.updateSurvivor(id, latitude, longitude).then(survivor => {
            return survivor;
        });;

        /**
         * @type {updatedSurvivorResponseModel}
         */
        const response = {
            data: {
                updatedSurvivor: survivor,
            },
            status: 200
        };

        return response;
    } catch (error) {
        return error
    }
}

/**
 * 
 * @param {InfectedReportSchema} report 
 * @returns
 */
async function flagSurvivor(report) {
    try {
        const infectReport = await survivorRepository.flagSurvivor(report).then(report => {
            return report;
        });;

        const infected = await survivorRepository.countSurvivorInfectionsInReports(report).then(infecteds => {
            return infecteds;
        });

        console.log(infected)
        if (infected >= 3) {
            const survivor = await survivorRepository.infectSurvivor(report.flagedSurvivor);
            const repository = await inventorRepository.disableInventory(report.flagedSurvivor);
            console.log("survivor infected => " + survivor);
            console.log("inventory disabled => " + repository);
        }

        /**
         * @type {flagSurvivorResponseModel}
         */
        const response = {
            data: {
                infectReport: infectReport
            },
            status: 201
        };

        return response;
    } catch (error) {
        return error
    }
}

module.exports = { addSurvivor, updateSurvivor, flagSurvivor };