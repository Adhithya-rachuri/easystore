//"@Author": "Aditya Rachuri"

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const backup = require('mongodb-backup');
// const restore = require('mongodb-restore');



/*=============================================================
*
*   IMAGE UPLOAD
*
*===============================================================
*/

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
	cb(null, 'uploads');
  },
  filename: function(req, file, cb) {
	cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
	cb(null, true);
  } else {
	cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
	fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});


/*=============================================================
*
*   AUTH ROUTES ----- GET/POST/PUT/DELETE
*
*===============================================================
*/

const User = require('../models/user');
const Patient = require('../models/patients');
const Docter = require('../models/doctors');
const Admin = require('../models/admin');


//sign-up

router.post('/signup', (req, res, next) => {
	User.find({email:req.body.email})
	.exec()
	.then(user=> {
		if(user.length >= 1){
			// do nothing
			if(user[0].email == req.body.email) {
				return res.status(409).json({  // 409 is conflict or 422 
					message: 'Email already exists please try another'
				}); 
			}
		}else {
			bcrypt.hash(req.body.password, 10, (err, hash)=> {
				if(err) {
					return res.status(500).json({
						error: err
					});
				} else {
					const user = new User({
						_id: new mongoose.Types.ObjectId(),
						patient_id: req.body.patient_id,
						email: req.body.email,
						password: hash,
						first_name: req.body.first_name,
						last_name: req.body.last_name
					});
					user
						.save()
						.then(result => {
							console.log(result);
							res.status(201).json({
								message: 'User created'
							});
						})
						.catch(err => {
							console.log(err);
							res.status(500).json({
								error: err
							});
						});
				}
			});
		}
	});
});

//sign-in

router.post('/login', (req, res, next) => {
	var SIN = '';
	Patient.findOne({email: req.body.userName}).exec().then(data =>{
			SIN = data._doc.SIN;
	})

	User.find({ email: req.body.userName })
	.exec()
	.then(user => {
		if (user.length < 1) {
			return res.status(404).json({
				message: 'Auth Failed'
			});
		} 
		bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
			if(err) {
				return res.status(401).json({
					loggedIn: false,
					message: 'Auth Failed'
				});
			}
			if (result) {
			   const token =  jwt.sign(
			   {
					email: user[0].userName,
					userId: user[0]._id
				}, 
				process.env.JWT_KEY,
				{
					expiresIn: "1h"
				}
				);
				return res.status(200).json({
					type:user[0].patient_id,
					first_name: user[0].first_name,
					last_name: user[0].last_name,
					email: user[0].email,
					loggedIn: true,
					SINno:SIN,
					message: 'Auth Successfull',
					token: token
				});
			}
			res.status(401).json({
				loggedIn: false,
				message: 'Auth Failed'
			});
		});

	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
});


// delete user

router.delete ("/user/:id", (req, res, next) => {
	User.remove({ _id: req.params.id })
	.exec()
	.then(result => {
		res.status(200).json({
			message: 'User deleted'
		})
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
});


/*=============================================================
*
*   patients ROUTES ----- GET/POST/PUT/DELETE
*
*===============================================================
*/
 // get only one patient.
router.post('/patient1', (req,res, next)=>{
	Patient.findOne({SIN:req.body.SIN})
	.exec()
	.then(function(err, patient){
		res.status(201).json(err["_doc"]);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
})

//getting stduent's data
router.get('/patients', checkAuth, (req, res, next)=>{
	Patient.find(function(err, patients){
		res.json(patients);
	})
});

//adding new patient's record
router.post('/patient', checkAuth, upload.single("image"), (req, res, next) => {
	// console.log(req.body);
	const newPatient = new Patient({
	_id: new mongoose.Types.ObjectId(),
	SIN: req.body.SIN,
	patient_username: req.body.patient_username,
	first_name: req.body.first_name,
	last_name: req.body.last_name,
	dob: req.body.dob,
	gender: req.body.gender,
	addresses: req.body.addresses,
	status: req.body.status,
	patient_mother: req.body.patient_mother,
	mother_number:req.body.mother_number,
	patient_father: req.body.patient_father,
	father_number: req.body.father_number,
	patient_doctorName: req.body.patient_doctorName,
	patient_doctorNumber: req.body.patient_doctorNumber,
	email: req.body.email,
	image: req.file.path
	});

	newPatient
		.save()
		.then(result => {
			console.log(result);
			res.status(201).json({
				message: 'patient\'s record added successfully'
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
		});
	});

});

// updating patient record
router.patch("/patient/:id", (req, res, next) => {
  //logic to update particular patient's record
  const id = req.params.id;
  const updateOps = {};
  for (const [key, value] of Object.entries(req.body)) {
	updateOps[key] = value;
  }
  Patient.update({ _id: id }, { $set: updateOps })
	.exec()
	.then(result => {
	  res.status(200).json({
		  message: 'Patient record updated',
		  request: {
	          type: "PATCH",
	          url: "http://localhost:3000/api/patient/" + id
	      }
	  });
	})
	.catch(err => {
	  console.log(err);
	  res.status(500).json({
		error: err
	  });
	});
});

//deleting patient's record
router.delete('/patient/:id', checkAuth, (req, res, next)=>{
	//logic to delete patient's record
	//console.log('****coming***', req.params.id);
	const id = req.params.id;
	Patient.deleteOne({ _id: id })
	.exec()
	.then(result => {
		res.status(200).json({
			message: 'Patient deleted',
			request: {
	          type: "POST",
	          url: "http://localhost:3000/api/patient" + id
	        }
		})
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});

});


module.exports = router;