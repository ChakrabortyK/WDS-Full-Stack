const express = require('express');
const router = express.Router();
const BookModel = require('../models/book')
const AuthorModel = require('../models/author')

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
router.post('/new', async (req, res) => {
  res.send("Post Books")
  })

module.exports = router;