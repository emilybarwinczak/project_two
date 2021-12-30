let express = require("express")
const db = require("../models")
const router = express.Router()
const isLoggedIn = require("../middleware/isLoggedIn")


// router.get("/:post", function (req, res) {
//     db.post.findAll()
// })

router.get("/allPosts", (req, res) => {
    db.post.findAll()
      .then((posts) => {
        res.render("posts/index", { posts })
      })
      .catch(err => console.log(err))
  })
  