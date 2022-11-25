const { SurvivorSchema, SurvivorModel } = require('../models/SurvivorModel');
const { InfectedReportSchema, InfectedReportModel } = require('../models/InfectedReportModel');

/**
 * 
 * @param {SurvivorSchema} survivor
 * @returns 
 */
function addSurvivor(survivor) {
    survivor.infected = false;
    const survivorModel = new SurvivorModel(survivor);

    const response = new Promise((next) => {
        survivorModel.save((err, docs) => {
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
 * @param {Number} latitude 
 * @param {Number} longitude
 * @param {String} id
 * @returns
 */
function updateSurvivor(id, latitude, longitude) {
    const response = new Promise((next) => {
        SurvivorModel.findByIdAndUpdate(id, { lastLocation: { latitude: latitude, longitude: longitude } }, (err, docs) => {
            if (err) {
                next(err);
            }
            else {
                next(docs);
            }
        });
    });

    return response

}

/**
 * 
 * @param {InfectedReportSchema} report 
 * @returns
 */
function flagSurvivor(report) {
    const infectedReportModel = new InfectedReportModel(report);

    const response = new Promise((next) => {
        infectedReportModel.save((err, docs) => {
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
 * @param {String} id 
 * @returns 
 */
function infectSurvivor(id){
    const survivor = new Promise((next) => {
        SurvivorModel.findByIdAndUpdate(id, {infected: true}, (err, docs) => {
            if (err) { next(err) }
            else { next(docs) }
        });
    })

    return survivor;
}

/**
 * 
 * @param {InfectedReportSchema} report 
 */
function countSurvivorInfectionsInReports(report){
    const response = new Promise((next) => {
        InfectedReportModel.count({ flagedSurvivor: report.flagedSurvivor }, async (err, docs) => {
            if (err) {
                next(err);
            } else {
                next(docs);
            }
        });
    })

    return response;
}

const getSurvivors = () => {
    const survivors = new Promise((next) => {
        SurvivorModel.countDocuments({}, (err, docs) => {
            if (err) { next(err) }
            else { next(docs) }
        });
    });
    
    return survivors;
}

const getInfecteds = () => {
    const infecteds = new Promise((next) => {
        SurvivorModel.countDocuments({ infected: true }, (err, docs) => {
            if (err) { next(err) }
            else { next(docs) }
        });
    })
    
    return infecteds;
}

const getNonInfecteds = () => {
    const nonInfecteds = new Promise((next) => {
        SurvivorModel.countDocuments({ infected: false }, (err, docs) => {
            if (err) { next(err) }
            else { next(docs) }
        });
    })
    
    return nonInfecteds;
}

module.exports = 
{ 
    addSurvivor, 
    updateSurvivor, 
    flagSurvivor, 
    countSurvivorInfectionsInReports, 
    infectSurvivor,
    getSurvivors,
    getInfecteds,
    getNonInfecteds,
 };