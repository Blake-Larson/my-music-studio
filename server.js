const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const logger = require('morgan');
const connectDB = require('./config/database');
const mainRoutes = require('./routes/main');
const studentRoutes = require('./routes/student');
const lessonRoutes = require('./routes/lesson');
const todoRoutes = require('./routes/todo');

const cors = require('cors');

require('dotenv').config({ path: './config/.env' });

// app.use(
// 	cors({
// 		credentials: true,
// 		origin: 'https://mymusicstudio.netlify.app/',
// 	})
// );

app.use(cors());

// Passport config
require('./config/passport')(passport);

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));

// Sessions
app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
		cookie: { maxAge: 604800016 },
	})
);

// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.static('build'));
// 	app.get('*', (req, res) => {
// 		res.sendFile(path.join('clinet', 'build', 'index.html'));
// 	});
// }

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/', mainRoutes);
app.use('/students', studentRoutes);
app.use('/lessons', lessonRoutes);
app.use('/todos', todoRoutes);

app.listen(process.env.PORT, () => {
	console.log('Server is running, you better catch it!');
});
