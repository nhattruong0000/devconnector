const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport  = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');


const app = express();
//db config
const db = require('./config/keys').mongoURI;

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

//connect to mongoDB
mongoose.connect(db)
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log(err));

// Passport moddleware
app.use(passport.initialize());

require('./config/passport')(passport)
//

app.get('/', (req, res) => res.send('hello wolrd hahah'));

// Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
// app.use('/api/posts', posts);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
