const express = require('express')
const router = express.Router()

const Model = require('../models')
const Post = Model.Post
const Provider = Model.Provider
const Worker = Model.Worker
const Tag = Model.Tag

router.get("/", (req, res) => {
    res.render("./worker/feeds.ejs")
})

router.get("/feeds", (req, res) => {
    res.render("./worker/feeds.ejs")
})

router.get("/search-job", (req, res) => {
    res.render("./worker/search-job.ejs")
})

router.get("/ongoing", (req, res) => {
    res.render("./worker/ongoing.ejs")
})

router.get("/history", (req, res) => {
    res.render("./worker/history.ejs")
})

router.get("/profile", (req, res) => {
    res.render("./worker/profile.ejs")
})

module.exports = router