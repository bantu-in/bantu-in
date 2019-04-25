const express = require('express')
const router = express.Router()
const fs = require('fs')

const Model = require('../models')
const Post = Model.Post
const Provider = Model.Provider
const Worker = Model.Worker
const Tag = Model.Tag
const inRupiah = require('../helpers/inRupiah')
const axios = require('axios')

router.use(express.urlencoded({extended: false}))

router.get("/:username/feeds", (req, res) => {
    if(!req.session.userId){
        res.render("login.ejs")
    }
    else{
        let id = req.session.userId
        Promise.all([
            Post.findAll({where: {status: "waiting"}}),
            Worker.findByPk(id)])
            .then(found => {
                // res.send(found)
                res.render(`./worker/feeds.ejs`, {
                    data: found[1],
                    posts: found[0],
                    inRupiah: inRupiah,
                    username: req.session.username,
                    userId: req.session.id
                })
            }).catch(err => {
                console.log(err)
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
        Post.findAll({
            include: [Worker],
            where: {status: "ongoing"}
        })
        .then(found => {
            // res.send(found)
            res.render("./worker/ongoing.ejs", {
                username: req.session.username,
                userId: req.session.userId,
                posts: found
            })
        })
    }
})

router.get("/:username/history", (req, res) => {
    if(!req.session.userId){
        res.render("login.ejs")
    }else{
        Post.findAll({
            include: [Worker],
            where: {status: "completed"}
        })
        .then(found => {
            // res.send(found)
            res.render("./worker/history.ejs", {
                username: req.session.username,
                userId: req.session.userId,
                posts: found
            })
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

router.get("/:username/jobDetails/:id", (req, res) => {
    if(!req.session.userId){
        res.render("login.ejs")
    }else{
        Post.findByPk(req.params.id)
        .then(found => {
            return found
        }).then( postData => {
            let url = (`https://maps.googleapis.com/maps/api/geocode/json?latlng=${postData.lat},${postData.lng}&sensor=true&key=AIzaSyBvszf7pWDZ7MA-umkI-U7EEAj8jTYTLDQ`)            
            axios.get(url)
            .then(addr => {
                let address = addr.data.results[0].formatted_address
                    res.render(`./worker/job-details.ejs`, {
                        username: req.session.username,
                        userId: req.session.userId,
                        post: postData,
                        address,
                        inRupiah
                    })
            })
        })
    }
})
            
    
    

// router.get("/:username/test", (req,res) => {
//     res.send('masuk')
// })

module.exports = router