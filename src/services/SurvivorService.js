const surivorServiceImpl = require('./impl/SurvivorServiceImpl');
const { Types } = require('mongoose');

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const addSurvivor = async (req, res) => {
    await surivorServiceImpl.addSurvivor(req.body.survivor, req.body.inventory)
        .then(response => {
            res.status(response.status).json(response)
        });
}

const updateSurvivor = async (req, res) => {
    await surivorServiceImpl.updateSurvivor(Types.ObjectId(req.params.id), req.body.latitude, req.body.longitude)
        .then(response => {
            res.status(response.status).json(response)
        });
}

const flagSurvivor = async (req, res) => {
    await surivorServiceImpl.flagSurvivor(req.body)
        .then(response => {
            res.status(response.status).json(response)
        });
}

module.exports = { addSurvivor, updateSurvivor, flagSurvivor };