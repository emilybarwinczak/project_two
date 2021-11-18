// Search for a country
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