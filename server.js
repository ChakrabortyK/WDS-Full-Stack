if (process.env.NODE_env !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser');




app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout','layouts/layout');
app.use(expressLayouts);
app.use(express.static("static"));
app.use(bodyParser.urlencoded({limit:'10mb', extended: false}));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (err)=>{console.error(err)});
db.once('open',()=> console.log('Database opened'));



const indexRouter = require('./routes/index');
app.use('/', indexRouter)
const authorRouter = require('./routes/authors');
app.use('/authors',authorRouter)
const bookRouter = require('./routes/books');
app.use('/books',bookRouter)


app.listen(process.env.PORT || 80 , ()=>{
    console.log(`Server is running on port http://localhost`);
});