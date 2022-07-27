const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path')
const app = express();

const connectDB = require('./server/database/connection');

const users = require('./server/routes/router')

dotenv.config({path:'.env'})
const PORT = process.env.PORT||8080;

/// log request
app.use(morgan('tiny'));
/// mongodb connection

connectDB();
/// parse request to body-parser
app.use(bodyparser.urlencoded({extended: true}));

/// set view engine
app.set("view engine", "ejs");
//app.set("views",path.resolve(__dirname,"views"))


/// load asset
///load css img and js
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

//load routers

app.use('/', users)


app.listen(PORT, ()=>{console.log(`server is running on http://localhost:${PORT}`)})