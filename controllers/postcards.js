//Dependencies
const express = require('express');
const alpacapost = express.Router();
// require the schema
const Postcard = require('../models/postcards.js');
// require seed data
const postcards = require('../models/seed.js')


// index
alpacapost.get('/', (req, res)=>{
  // find all postcards
  Postcard.find({}, (error, allPostcards)=>{
    // render index page
    res.render('index.ejs', {
      // passes found postcards to index page
      postcards: allPostcards
    })
  })
})


// SEED ROUTE
alpacapost.get('/seed', (req, res)=>{
  Postcard.create(postcards, (err, createdPostcard)=>{
    res.redirect('/alpacapost')
  })
})

// create postcard
alpacapost.post('/', (req, res)=>{
  Postcard.create(req.body, (error, createdPostcard)=>{
    res.redirect('/alpacapost')
    // res.send('you created a thing!')
  })
})

// new
alpacapost.get('/new', (req, res)=>{
  res.render('new.ejs')
})

// show
alpacapost.get('/:id', (req, res)=>{
  Postcard.findById(req.params.id, (err, foundPostcard)=>{
    res.render('show.ejs',
    {
      postcard: foundPostcard
      // postcard: postcards[req.params.id],
      // index: [req.params.id]
    })
  })
})

// DELETE ROUTE
alpacapost.delete('/:id', (req, res)=>{
  Postcard.findByIdAndRemove(req.params.id, (err, data)=>{
    res.redirect('/alpacapost');//redirect back to store index
  })
});

// edit route
alpacapost.get('/:id/edit', (req, res)=>{
  Postcard.findById(req.params.id, (err, foundPostcard)=>{
    res.render('edit.ejs', {
      // postcard: postcards[req.params.id]
      postcard: foundPostcard
    })
  })
})

// Update edit put route
alpacapost.put('/:id', (req, res)=>{
  Postcard.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedPostcard)=>{
    res.render('show.ejs', {
      postcard: updatedPostcard
    })
  })
})



module.exports = alpacapost;
