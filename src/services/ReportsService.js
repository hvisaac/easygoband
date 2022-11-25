const reportServiceImpl = require('./impl/ReportServiceImpl');

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const getInfecteds = async (req, res) => {
    await reportServiceImpl.getInfecteds()
        .then(response => {
            res.status(response.status).json(response)
        });
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
 const getNonInfecteds = async (req, res) => {
    await reportServiceImpl.getNonInfecteds()
        .then(response => {
            res.status(response.status).json(response)
        });
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
 const getItems = async (req, res) => {
    await reportServiceImpl.getItems()
        .then(response => {
            res.status(response.status).json(response)
        });
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
 const getLosedPoints = async (req, res) => {
    await reportServiceImpl.getLosedPoints()
        .then(response => {
            res.status(response.status).json(response)
        });
}

module.exports = { getInfecteds, getNonInfecteds, getItems, getLosedPoints };