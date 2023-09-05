const express = require('express');
const router = express.Router();
const AuthorModel = require('../models/author')

//ALL AUTHORS ROUTE
router.get('/', async (req, res) => {

  let searchOptions={};
  const something = req.query.name;
  if (something != null || something != '') {
    searchOptions.name = new RegExp(something, 'i');
  }


  try {
    const auths = await AuthorModel.find(searchOptions);
    res.status(200).render('authors/index',
    {
      authors : auths,
      searchOpt : req.query
     });
    // res.json({authors});
    
  } catch (error) {
    res.error(error);
  }

});


//NEW AUTHORS ROUTE
router.get('/new', (req, res) => {
    res.status(200).render('authors/new',{author: new AuthorModel()});
});


//CREATE AUTHORS ROUTE
router.post('/new', async (req, res) => {
    const author = new AuthorModel({
      name: req.body.name
    })
    try {
      // console.log("HIT")
      const newAuthor = await author.save()
      // res.redirect(`authors/${newAuthor.id}`)
      res.redirect(`/authors`)
    } catch(err) {
      res.render('authors/new', {
        author: author,
        errorMessage: 'theres some error'
      })
    }
  
    
  })

module.exports = router;