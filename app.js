const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// Passport Config
require('./config/passport')(passport);

//db config
var db = require('./config/keys').MongoURI;

//connect to mongo
mongoose.connect(db, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log("connected")
    })
    .catch(err => {
        console.log(err)
    })

app.use(expressLayouts)
app.set('view engine', 'ejs')

//body parser middleware
app.use(express.urlencoded({
    extended: true
}));


// Express session

app.use(

    session({

        secret: 'secret',
        resave: true,
        saveUninitialized: true
        //cookie:{secure:true}
    })

);


// Passport middleware

app.use(passport.initialize());

app.use(passport.session());

//connect to flash
app.use(flash())

//global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})


app.use('/', require('./routes/index'))
app.use('/users', require('./routes/user'))
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));