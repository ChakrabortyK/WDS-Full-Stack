const express = require('express');
const router = express.Router();
const Author = require('../models/author')

//ALL AUTHORS ROUTE
router.get('/', async (req, res) => {

  let searchOptions={};
  const something = req.query.name;
  if (something != null || something != '') {
    searchOptions.name = new RegExp(something, 'i');
  }


  try {
    const auths = await Author.find(searchOptions);
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
    } catch(err) {
      res.render('authors/new', {
        author: author,
        errorMessage: 'theres some error'
      })
    }
    // res.send(req.body.name)

    // author.save().then((err,newAuthor)=>{
    //   if(err){
    //     res.render('authors/new', {
    //       author: author,
    //       errorMessage: 'Error creating Author'
    //     })
    //   }else{
    //     res.redirect(`authors`)
    //   }
    // })





    
  })

module.exports = router;