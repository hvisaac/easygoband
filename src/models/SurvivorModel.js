const { Schema, model } = require('mongoose');

/**
 * 
 * @type {{ id: String, name: String, age: Number, gender: String, lastLocation: {latitude: Number, longitude: Number}, infected: Boolean}}
 */
const SurvivorSchema = new Schema({
    id: String,
    name: String,
    age: Number,
    gender: String,
    lastLocation: {
        latitude: Number,
        longitude: Number
    },
    infected: Boolean
});

const SurvivorModel = model('SURVIVORS', SurvivorSchema);

module.exports = { SurvivorSchema, SurvivorModel }