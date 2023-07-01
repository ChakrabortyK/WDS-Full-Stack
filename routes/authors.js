const express = require('express');
const router = express.Router();
const Author = require('../models/author')

//ALL AUTHORS ROUTE
router.get('/', (req, res) => {
    res.status(200).render('authors/index');
});


//NEW AUTHORS ROUTE
router.get('/new', (req, res) => {
    res.status(200).render('authors/new',{author: new Author()});
});


//CREATE AUTHORS ROUTE
router.post('/', async (req, res) => {
    const author = new Author({
      name: req.body.name
    })
    try {
      const newAuthor = await author.save()
      // res.redirect(`authors/${newAuthor.id}`)
      res.redirect(`authors`)
    } catch {
      res.render('authors/new', {
        author: author,
        errorMessage: 'Error creating Author'
      })
    }
  })

module.exports = router;