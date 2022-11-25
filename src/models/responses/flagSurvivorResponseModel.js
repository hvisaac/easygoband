const { InfectedReportSchema } = require("../InfectedReportModel")

/**
 * 
 * @type { {data:{infectReport: InfectedReportSchema}, status: Number} }
 */
const flagSurvivorResponseModel = {
    data: {
       infectReport: InfectedReportSchema,
    },
    status: Number
}

module.exports = { flagSurvivorResponseModel }