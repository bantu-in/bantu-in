const express = require('express')
const router = express.Router()

const Model = require('../models')
const Post = Model.Post
const Provider = Model.Provider
const Worker = Model.Worker
const Tag = Model.Tag

router.get("/", (req, res) => {
    res.render("./provider/my-project.ejs")
})

router.get("/my-project", (req, res) => {
    res.render("./provider/my-project.ejs")
})

router.get("/history", (req, res) => {
    res.render("./provider/history.ejs")
})

router.get("/find-worker", (req, res) => {
    res.render("./provider/find-worker.ejs")
})

router.get("/profile", (req, res) => {
    res.render("./provider/profile.ejs")
})

module.exports = router