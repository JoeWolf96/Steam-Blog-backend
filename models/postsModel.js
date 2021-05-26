const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const postsSchema = new Schema({
    name: { type: String ,required:true },
})


module.exports = model('Posts', postsSchema)
