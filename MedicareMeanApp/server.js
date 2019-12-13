// importing modules
var express = require('express'),
    app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');

//route
const route = require('./routes/route');

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/adityaDb');

//on connection
mongoose.connection.on('connected',(err)=>{
    if(err){
        console.log('Error in db connection: ' + err);
    }
    console.log('Connected to db mongodb #27017');
})

mongoose.Promise = global.Promise;

//port
const port = process.env.PORT || 3000;

//route for home page - static file
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/views/index.html');
    //res.use(express.static(path.join(__dirname, 'public')));
});

//adding middleware - cors
app.use(cors());

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const directory = path.join(__dirname, '/uploads');
app.use('/uploads', express.static(directory));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use('/api', route);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


//using arrow function in callback
app.listen(3000, ()=>{
    console.log('I\'m Listening on port 3000...');
});