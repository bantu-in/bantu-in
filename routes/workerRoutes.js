const express = require('express')
const router = express.Router()

const Model = require('../models')
const Post = Model.Post
const Provider = Model.Provider
const Worker = Model.Worker
const Tag = Model.Tag

router.use(express.urlencoded({extended: false}))

router.get("/:username/feeds", (req, res) => {
    if(!req.session.userId){
        res.render("login.ejs")
    }
    else{
        let id = req.session.userId
        Promise.all([
            Post.findAll(),
            Worker.findByPk(id)])
            .then(found => {
                // res.send(found)
                res.render(`./worker/feeds.ejs`, {
                    data: found[1],
                    posts: found[0],
                    username: req.session.username,
                    userId: req.session.id
                })
            }).catch(err => {
                res.send(err)
            })
    }
})

router.get("/:username/search-job", (req, res) => {
    if(!req.session.userId){
        res.render("login.ejs")
    } else{
        res.render("./worker/search-job.ejs", {
            username: req.session.username,
            userId: req.session.userId
        })
    }
})

router.get("/:username/ongoing", (req, res) => {
    if(!req.session.userId){
        res.render("login.ejs")
    }else{
        res.render("./worker/ongoing.ejs", {
            username: req.session.username,
            userId: req.session.userId
        })
    }
})

router.get("/:username/history", (req, res) => {
    if(!req.session.userId){
        res.render("login.ejs")
    }else{
        res.render("./worker/history.ejs", {
            username: req.session.username,
            userId: req.session.userId
        })
    }
})

router.get("/:username/profile", (req, res) => {
    if(!req.session.userId){
        res.render("login.ejs")
    }else{
        res.render("./worker/profile.ejs", {
            username: req.session.username,
            userId: req.session.userId
        })
    }
})

module.exports = router