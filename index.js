require('dotenv').config()
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/ppConfig')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const db = require('./models')
const methodOverride = require('method-override')


// views (ejs and layouts) set up
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// body parser middelware
app.use(express.urlencoded({extended:false}))

// session middleware
app.use(session({
    secret: process.env.SUPER_SECRET_SECRET,
    resave: false,
    saveUninitialized: true
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(methodOverride('_method'))
// flash middleware (must go AFTER session middleware)
app.use(flash())

// custom middleware
app.use((req, res, next) => {
    // before every route, attach the flash messages and current user to res.locals
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next()
})

// controllers middleware 
app.use('/auth', require('./controllers/auth'))
app.use('/post', require('./controllers/post'))
// app.use('/allPosts', require('./controllers/allPosts'))

// home route
app.get('/', (req, res)=>{
    res.render('home')
})

// profile route
app.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile')
})

app.post('/post/new', (req, res) => {
    let posts = fs.readFileSync('./posts.json')
    let postsData = JSON.parse(posts)
    // console.log(req.body)
    // res.render('posts')
    postsData.push(req.body)
    fs.writeFileSync('./posts.json', JSON.stringify(postsData))
    res.redirect('/posts')
})

app.listen(3000, ()=>{
    console.log(`process.env.SUPER_SECRET_SECRET ${process.env.SUPER_SECRET_SECRET}`)
    console.log("auth_practice running on port 3000")
})