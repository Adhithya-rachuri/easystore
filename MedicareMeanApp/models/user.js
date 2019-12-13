const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        require: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    patient_id: {
        type:String,
        require:true
    },
    password: {
        type: String,
        require: true
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    }
});

const User = module.exports = mongoose.model('User', UserSchema);
