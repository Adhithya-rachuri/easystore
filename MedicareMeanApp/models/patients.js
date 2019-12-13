const mongoose = require('mongoose');

const PatientSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
    SIN: {
             type : String,
             required : false
            },
    patient_username:  {
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

    patient_mother:{
            type : String,
             required : true
    },
    mother_number:{
            type : String,
             required : true
    },
    patient_father:{
             type : String,
             required : true
    },
    father_number:{
            type : String,
             required : true
    },
    patient_doctorName:{
             type : String,
             required : true
    },
    patient_doctorNumber:{
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

const Patient = module.exports = mongoose.model('Patient', PatientSchema);



