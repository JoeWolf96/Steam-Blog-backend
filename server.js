//DEPENDENCIES
require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3005 ;
const mongoose = require('mongoose');
const cors = require('cors')
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const url='https://api.steampowered.com/ISteamApps/GetAppList/v2/'

// MIDDLEWARE
// Setup Cors middleware
const whitelist = ['http://localhost:3000', process.env.BASEURL,'https://api.steampowered.com/ISteamApps/GetAppList/v2/?key=788BB881FB9E4532A765F61E7C1D7847&format=json']
const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
	credentials:true
}
app.use(cors(corsOptions))



app.use(session({
	secret: 'lol',
	resave: false,
	saveUninitialized: false,
		uri: 'mongodb://127.0.0.1:27017/steam',
		collection: 'mySessions'
	}))


//  mongoose
const db = mongoose.connection;
mongoose.connect('mongodb://127.0.0.1:27017/steam',{
	useNewUrlParser:true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

db.once('open', ()=> console.log('DB connected...'));
db.on('error', (error)=> console.log(error.message));
db.on('disconnected', ()=> console.log('Mongoose disconnected...'));

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next()
    } else {
        res.status(403).json({msg:"login required"})
    }
}

app.use(express.json());


// controllers
app.use('/blog', require('./controllers/blogController'))
app.use('/steam', require('./controllers/steamController'))
app.use('/users', require('./controllers/userController'))


app.listen(PORT, ()=>{
	console.log(`Server is listening on port ${PORT}`);
})
