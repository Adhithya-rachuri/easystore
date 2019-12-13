const mongoose = require('mongoose');

const DoctorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    doctor_id: {
             type : String,
             required : false
            },
    doctor_username:  {
             type : String,
             required : true
            },
    first_name:  {
                type : String,
                required : true
                },
    last_name: {
                type : String,
                required : true
                },
    dob:   {
             type : String,
             required : true
            },
    gender:   {
             type : String,
             required : true
            },
    addresses:  {
             type : String,
             required : true
            },
    email: {
                    type : String,
                    required : true
                },
    image: {
                    type : String,
                    required : true
                }
});

const Doctor = module.exports = mongoose.model('Doctor', DoctorSchema);
