const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');


const BookModel = require('../models/book')
const AuthorModel = require('../models/author')

const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']
const uploadPath = path.join('static',BookModel.coverImgBasePath)
// console.log(uploadPath);
const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype))
  }
})






//ALL BOOKS ROUTE
router.get('/', async (req, res) => {
res.send("All Books")

});


//NEW BOOKS ROUTE
router.get('/new', async (req, res) => {
  try {
    const authors = await AuthorModel.find({})
    const book = new BookModel()

    res.render('books/new', { authors, book })
  } catch (error) {
    console.log(error)
  }
});


//CREATE BOOKS ROUTE
router.post('/new',upload.single('cover'), async (req, res) => {
  const filename = req.file != null ? req.file.filename : null
  const book = new BookModel({
    title: req.body.title,
    author: req.body.author,
    publishDate : new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    coverImgName: filename,
    description: req.body.description
  })

  try {
    const newBook = await book.save();
    // res.redirect(`/authors/${newAuthor.id}`)
    res.redirect('/books')
  } catch (err) {
    
  }
})

module.exports = router;