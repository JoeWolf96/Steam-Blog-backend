const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const usersSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    favourites:[{
      type:Schema.Types.ObjectId,ref:'Favourites'
    }],
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Posts',
    }],

})


module.exports = model('User', usersSchema)
