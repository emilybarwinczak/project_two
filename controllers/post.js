require("dotenv").config()
let express = require("express")
const db = require("../models")
const router = express.Router()
const post = require("../models/post")
const sequelize = require("sequelize")
const methodOverride = require('method-override')
const isLoggedIn = require("../middleware/isLoggedIn")


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
router.get("/new", isLoggedIn, (req, res) => {
      res.render("posts/new")
    })


// Post to Profile
router.post("/posts", isLoggedIn, (req, res) => {
  db.post.create({
    city: req.body.city,
    country: req.body.country,
    content: req.body.content,
    photo: req.body.photo
  })
    // .then((post) => {
    //   res.render("posts/new", { post: post })
    .then(createdPost => {
      res.redirect("/posts")
    })
    // })
    .catch((error) => {
      console.log(error)
    })
})

// Profile -- ALL POSTS
router.get("/allPosts", (req, res) => {
  db.post.findAll()
    .then((posts) => {
      res.render("posts/index", { posts })
    })
    .catch(err => console.log(err))
})

module.exports = router