const { Schema, model } = require('mongoose');

/**
 * 
 * @type { { id: String, flagedSurvivor: String, reportingSurvivor: String}}
 */
const InfectedReportSchema = new Schema({
    id: String,
    flagedSurvivor: String,
    reportingSurvivor: String
});

const InfectedReportModel = model('INFECTEDS_REPORTS', InfectedReportSchema);

module.exports = { InfectedReportSchema, InfectedReportModel }