const express = require('express')
const router = express.Router()

const Model = require('../models')
const Post = Model.Post
const Provider = Model.Provider
const Worker = Model.Worker
const Tag = Model.Tag

router.get("/", (req, res) => {
    res.render("feeds.ejs")
})

module.exports = router