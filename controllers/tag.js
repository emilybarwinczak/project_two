let express = require("express")
const db = require("../models")
const router = express.Router()
const sequelize = require("sequelize")
const tag = require("../models/tag")
const post = require("../models/post")

module.exports = router