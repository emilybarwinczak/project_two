let express = require('express')
let db = require('../models')
const router = express.Router()
const post = require('../models/post')
const sequelize = require('sequelize')
const { Op } = require('sequelize')
const methodOverride = require('method-override')
const cloudinary = require('cloudinary')
const multer = require('multer')
const upload = multer({ dest: './uploads/' })


// SEARCH
router.get('/search', (req, res) => {
  console.log('result route')
  console.log(req.query)
  db.post.findAll({
    where: { location: req.query.location }
  }).then((posts) => {
    console.log('metallllll')
    res.render('posts/result', { posts: location })
  }).catch((error) => {
    console.log(error)
    res.send('RESULTS NOT RENDERING')
  })
})

// Form to Create Post
router.get("/new", (req, res) => {
  db.post.findAll()
    .then((post) => {
      res.render("posts/new", { post: post })
    })
    .catch((error) => {
      res.status(200).send("new posts")
    })
})

// Post to Profile
router.post("/new", (req, res) => {
  db.post.create({
    city: req.body.city,
    country: req.body.country,
    content: req.body.content,
    title: req.body.title
  })
    .then((post) => {
      res.render("posts/image", { post: post })
    })
    .catch((error) => {
      console.log(error)
    })
})

// Profile -- ALL POSTS
router.get("/", (req, res) => {
  db.post.findAll()
    .then((posts) => {
      res.render("posts/index", { posts })
    })
    .catch(err => console.log(err))
})

module.exports = router