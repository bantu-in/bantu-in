const express = require('express')
const router = express.Router()

const Model = require('../models')
const Post = Model.Post
const Provider = Model.Provider
const Worker = Model.Worker
const Tag = Model.Tag
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const inRupiah = require('../helpers/inRupiah')


router.get("/", (req, res) => {
    res.render("./provider/my-project.ejs")
})

router.get("/my-project", (req, res) => {
    Promise.all([
        Post.findAll({
            where : {
                ProviderId : 3,
                status : 'ongoing'
            }
        }),
        Post.findAll({
            where : {
                ProviderId : 3,
                status : 'waiting'
            }
        })
    ])
        .then(data => {
            let ongoingPosts = data[0]
            let waitingPosts = data[1]
            res.render("./provider/my-project.ejs", {
                ongoingPosts : ongoingPosts,
                waitingPosts : waitingPosts,
                inRupiah
            })
        })
        .catch(err => {
            res.send(err)
        })
})

router.get("/new-project", (req, res) => {
    res.render("./provider/new-project.ejs")
})

router.get("/history", (req, res) => {
    Post.findAll({
        where : {
            ProviderId : 3,
            status : "complete"
        }
    })
        .then((posts) => {
            res.render("./provider/history.ejs", {
                posts : posts,
                inRupiah
            })
        })
        .catch(err => {
            res.send(err)
        })
})

router.get("/find-worker", (req, res) => {
    res.render("./provider/find-worker.ejs")
})

router.get("/profile", (req, res) => {
    Provider.findByPk(3)
        .then(provider => {
            console.log(provider.username)
            res.render("./provider/profile.ejs", {
                provider : provider
            })
        })
})

module.exports = router