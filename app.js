const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

//Connect to Database
databaseConfig = require('./config/database');
mongoose.connect(databaseConfig.database);

mongoose.connection.on('connected', () =>{
  console.log('Connected to database ' + databaseConfig.database);
});

mongoose.connection.on('error', (err) =>{
  console.log('Database Error: ' + err);
});

// Set-Up Express
const app = express();
const port = process.env.PORT||3000;
const userRoutes = require('./routes/user');

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Passport Middlewares
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.get('/', (req, res) => {
  res.send("Hello Siddhesh");
});

app.use('/user', userRoutes);

app.listen(port, () => {
  console.log("Server started on port " + port);
})
