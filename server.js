if (process.env.NODE_env !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout','layouts/layout');
app.use(expressLayouts);
app.use( express.static("static"));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (err)=>{console.error(err)});
db.once('open',()=> console.log('Database opened'));

app.use('/', indexRouter)


app.listen(process.env.PORT || 80);