const { SurvivorSchema } = require('../SurvivorModel');

/**
 * 
 * @type { {data:{updatedSurvivor: SurvivorSchema}, status: Number} }
 */
const updatedSurvivorResponseModel = {
    data: {
        updatedSurvivor: SurvivorSchema
    },
    status: Number
}

module.exports = { updatedSurvivorResponseModel }