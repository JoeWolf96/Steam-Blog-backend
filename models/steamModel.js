const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const steamSchema = new Schema({
    name: { type: String ,required:true },
})


module.exports = model('Steam', steamSchema)
