const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{ type: String, required: true},
    email:{ type: String, required: true, unique: true },
    password: { type: String, required: true},
    posts: {type:Array, required:false}
});


module.exports = mongoose.model('Account3', accountSchema);